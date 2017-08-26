from pymongo import MongoClient
from pyro.basics import *


# Connect to the database.
DATABASE_NAME = 'annotate_db'
client = MongoClient()
database = client[DATABASE_NAME]
Pyro.attach_db(database)

# Define resources.
class Cohort(Pyro):
    pass

class Session(Pyro):
    pass

# Verify we actually want to nuke the database.
proceed = input('> Are you sure you want to proceed? (y/n) ')
if proceed == 'y':
    Cohort.delete_all()
    Session.delete_all()
    print('> It is done.')
else:
    print('> Chicken.')





