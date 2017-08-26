'''Back-end API for the annotation project.'''
from pyro.basics import *
from pymongo import MongoClient


# Define application constants.
DATABASE_NAME = 'annotate_db'

# Connect to the database.
client = MongoClient()
database = client[DATABASE_NAME]

# Attach database to the Pyro framework.
Pyro.attach_db(database)

# Define application models.
class Session(Pyro):
    pass

class Cohort(Pyro):
    pass

# Boot the application!
app = Application(Pyro)
app.run()


