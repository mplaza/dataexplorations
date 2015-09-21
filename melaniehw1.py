#!/usr/bin/env python

"""
Starter file for GA Data Science: HW1.

See instructions and tips (bottom of PDF) here: 
https://github.com/ga-students/dat-la-07/blob/master/hw/hw1.pdf

Note: Most of these functions will only be a few lines of code!
  You should only have to modify the functions to get it working --
  the code at the bottom already calls the functions in the right 
  order. Run the file immediately to get a feel for how it works.

"""
import math
import csv

from collections import Counter

ATHLETES_FILE = 'hw1-athletes.csv'


# Original column indices
AGE_COL    = 2
HEIGHT_COL = 3
WEIGHT_COL = 4
GENDER_COL = 5
EVENTS_COL = 12

# Added-on scaled column indices 
#   (assumes events were condensed into a single column)
SCALED_AGE_COL = 13
SCALED_HEIGHT_COL = 14
SCALED_WEIGHT_COL = 15

# These column indices define a point
POINT_COLS = [AGE_COL, HEIGHT_COL, WEIGHT_COL]
SCALED_POINT_COLS = [SCALED_AGE_COL, SCALED_HEIGHT_COL, SCALED_WEIGHT_COL]


def get_input():
    """
    Prompts user for an age, height, and weight.
    """

    age = input("Age (years)? ")
    height = input("Height (cm)? ")
    weight = input("Weight (kg)? ")

    return (age, height, weight)


#########################################
# DO THIS FIRST - k-NN without scaling
#########################################

def load_athletes(filename):
    assert(type(filename) == str and len(filename) > 0)
    athletes = []
    with open(filename) as csvfile:
        athlete_data = csv.reader(csvfile)
        next(csvfile, None)
        for row in athlete_data:
            if row[2] and row[3] and row[4]:
                row[12] = [row[12], row[13].split(', ')]
                del row[-1]
                athletes.append(row)
    """
    Loads athlete data from 'filename' into a list of tuples.

    Returns a list of tuples of each athlete's attributes, where
      the last element of each tuple is a list of events the athlete
      competed in.

    Hint: Use the csv module to read quoted fields correctly.

    1. The header line is skipped
    2. Rows are removed if missing a value for the age, height, or weight.
    3. All trailing events are placed in a list in position EVENTS_COL

    For example:
    [...,
     ['Zhaoxu Zhang', "People's Republic of China", 
      '24', '221', '110', 'M', '11/18/1987', 
      '', '0', '0', '0', '0', 
      ['Basketball', "Men's Basketball"]],
     ...
    ]
    """

    return athletes


def dist(x, y):
    """ 
    Euclidean distance between vectors x and y. 
    Each element of x and y must be numeric or a numeric string.

    Requires that len(x) == len(y).

    For example: 
        dist((0, 0, 0), (0, 5, 0)) == 5.0
        dist((1, 1, 1), (2, 2, 2)) == 1.7320508075688772
        dist(('1', '1', '1'), ('2', '2', '2')) == 1.7320508075688772
    """
    
    assert(len(x) == len(y))
    
    

    return math.sqrt(sum((x-y)**2 for x,y in zip(x,y)))


def nearest_athletes(point, athletes, k = 1):
    """
    Returns the 'k' athletes closest to 'point'.
    Sorts the athletes based on distance to 'point', then return the closest.
    """
    
    nearest = sorted(athletes, key= lambda x: dist(point, (int(x[2]), int(x[3]), int(x[4]))))

    return nearest[:k]


def most_common_event(athletes):
    """
    Returns the most frequently occuring event in all 'athletes'.
    Consider using Counter.
    """
    from itertools import chain
    athlete_events = list(chain.from_iterable(athletes[i][12][1] for i in range(0,(len(athletes)))))
    counted_events = Counter(athlete_events)
    return counted_events.most_common()[0][0]



############################
# DO THIS SECOND - CROSS-VALIDATION
############################

def cross_validate(athletes, column_indices, k = 20):
    """
    Uses each athlete as a test point. Finds that athlete's nearest neighbors, 
    then sees if their most common event matches one of the removed athlete's 
    events. This is an objective measure of classifier performance.

    Returns the percentage accuracy: num_correct / (num_incorrect + num_correct)
    """
    num_correct = 0
    num_incorrect = 0


        # Make each athlete a test point ...
    print("CROSS-VALIDATION:")
    for index,athlete in enumerate(athletes):
    # Every 1000 athletes, display the running percentage
        athlete_point = (int(athlete[column_indices[0]]), int(athlete[column_indices[1]]), int(athlete[column_indices[2]]))
        nearest = nearest_athletes(athlete_point, athletes, k = k)
        common_event = most_common_event(nearest)
        if any(common_event == s for s in athlete[12][1]):
            num_correct+=1
        else:
            num_incorrect+=1
        if index % 1000 == 0:
            print("{} of {}, accuracy so far={}".format(index, len(athletes),
            num_correct / (num_correct + num_incorrect)))
        
    return num_correct / (num_correct + num_incorrect)
    



############################
# DO THIS LAST - SCALING
############################

def scale(value, min_value = 0.0, max_value = 1.0):
    """
    For a given value, scales it to the range [0, 1]
       scaled = (value - min_value) / (max_value - min_value)

    Assumes 'min_value' and 'max_value' are floats.
    'value' can be a float or string.
    """
    assert(min_value < max_value)
    
    value = (int(value) - int(min_value)) / (int(max_value) - int(min_value))

    return value


def cols_minmax(data, column_indices):
    """
    Computes the min and max for each column of 'data' in 'column_indices'.
    
    Returns these in the 'mins' and 'maxes' lists. 
        So, mins[0] will be the min of the first column in 'column_indices'.

    For example:
        cols_minmax([[1, 2, 5], [4, 3, 4]], [1,2])
        => ([2,4], [3,5])
    """
    
    mins = []
    maxes = []
    
    for column in column_indices:
        column_data = []
        for d in data:
            column_data.append(int(d[column]))
        mins.append(min(column_data))
        maxes.append(max(column_data))
    

    return (mins, maxes)


def append_scaled_cols(data, column_indices):
    """
    Scales columns in 'data', for each column in 'column_indices'.
    Places the scaled values AT THE END of each row of 'data', in-place.
    Returns the (mins, maxes) of each of the 'column_indices'

    1) Computes the min/max for each column, using cols_minmax.
    2) Scales each column value in 'data' using the column min/max.
    3) Appends each scaled column value to the end of each row of 'data'.
    """
    minmax = cols_minmax(data, column_indices) 
    mins = minmax[0]
    maxs = minmax[1]

    # Appends the exact values to the end of each row, without scaling
    # Modify this to append the SCALED values instead
    for row in data:
        for index,col_index in enumerate(column_indices):
            scaled_data = scale(row[col_index], min_value = mins[index], max_value = maxs[index])
            row.append(scaled_data)
    return (mins, maxs)


def scale_point(point, mins, maxes):
    """ 
    Scale each element of 'point' using the corresponding
        index of the lists 'mins' and 'maxes'.

    Returns a tuple where each value in the original tuple is scaled.
    """
    scaled = ()
    for index,dim in enumerate(point):
       scaled = scaled + (scale(dim, mins[index], maxes[index]),)

    return scaled


############################
# MAIN PROGRAM
############################

####################
# GET THE DATA
####################
# Load the athlete data
athletes = load_athletes(ATHLETES_FILE)

# Get the test point and scale it, using the same scale factors
test_point = (32, 180, 68)
#test_point = get_input()

print("TEST POINT: ", test_point)


####################
# SCALE THE POINTS
####################
# These scaling routines currently append the 
#    exact column values to the end of each row, instead of
#    scaling them
scale_mins, scale_maxes = append_scaled_cols(athletes, POINT_COLS)
test_point = scale_point(test_point, scale_mins, scale_maxes)

print("SCALED POINT: ", test_point, "\n")


####################
# PERFORM K-NN
####################
# Find the nearest athletes to the test_point
nearest = nearest_athletes(test_point, athletes, k=3)

print("NEAREST ATHLETE(S): ")
print(nearest)
print()

# Find the most common event of the nearest athletes
event = most_common_event(nearest)
print("RECOMMENDED EVENT: ", event, "\n")

####################
# CROSS-VALIDATION
####################
# What is the accuracy of this classifier?
accuracy = cross_validate(athletes, POINT_COLS, k=10)
print("FINAL ACCURACY: ", accuracy)


