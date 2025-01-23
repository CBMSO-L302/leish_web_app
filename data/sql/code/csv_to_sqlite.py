import sqlite3
import pandas as pd

# File paths
infantum_csv = './leishseq_table_LinJ.csv'
donovani_csv = './leishseq_table_LdHU3.csv'
braziliensis_csv = './leishseq_table_Lbraz.csv'

# Database connection
conn = sqlite3.connect('./leishmania.db')
cursor = conn.cursor()

# Function to import CSV to table
def import_csv_to_table(csv_file, table_name):
    # Read the CSV file into a DataFrame, skipping the header row
    df = pd.read_csv(csv_file, header=0, sep=',')
    
    # Write the DataFrame to the SQLite table
    df.to_sql(table_name, conn, if_exists='append', index=False)

# Import the data
import_csv_to_table(infantum_csv, 'infantum')
import_csv_to_table(donovani_csv, 'donovani')
import_csv_to_table(braziliensis_csv, 'braziliensis')

# Commit and close the connection
conn.commit()
conn.close()

print("Data imported successfully.")