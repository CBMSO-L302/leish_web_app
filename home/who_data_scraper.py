import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os
from pathlib import Path

def scrape_who_leishmaniasis_data():
    """
    Scrapes data about cutaneous leishmaniasis cases from the WHO website.
    Returns a pandas DataFrame with the data.
    """
    url = 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/number-of-cases-of-cutaneous-leishmaniasis-reported'
    
    try:
        # Make a request to the WHO website
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # The data might be in a table or embedded in the page
        # We'll need to inspect the page structure to find the data
        # For now, let's try to find tables on the page
        tables = soup.find_all('table')
        
        if tables:
            # If tables are found, try to extract data from the first table
            df = pd.read_html(str(tables[0]))[0]
            print(f"Found data with columns: {df.columns}")
            return df
        else:
            # If no tables are found, we need to look for data in other formats
            # The data might be loaded via JavaScript or available through an API
            print("No tables found on the page. The data might be loaded dynamically.")
            
            # Check if there's a link to a CSV or Excel file
            data_links = soup.find_all('a', href=True)
            csv_links = [link['href'] for link in data_links if link['href'].endswith(('.csv', '.xlsx', '.xls'))]
            
            if csv_links:
                print(f"Found data file links: {csv_links}")
                # Download the first CSV/Excel file
                data_url = csv_links[0]
                if not data_url.startswith('http'):
                    data_url = 'https://www.who.int' + data_url if data_url.startswith('/') else 'https://www.who.int/' + data_url
                
                data_response = requests.get(data_url)
                data_response.raise_for_status()
                
                # Save the file temporarily
                temp_file = 'temp_data_file'
                with open(temp_file, 'wb') as f:
                    f.write(data_response.content)
                
                # Read the file based on its extension
                if data_url.endswith('.csv'):
                    df = pd.read_csv(temp_file)
                else:
                    df = pd.read_excel(temp_file)
                
                # Clean up
                os.remove(temp_file)
                return df
            
            # If we still don't have data, we might need to use an API
            # For now, let's check if there's an API endpoint mentioned on the page
            api_links = [link['href'] for link in data_links if 'api' in link['href'].lower()]
            if api_links:
                print(f"Found potential API links: {api_links}")
                # We would need to investigate these API endpoints further
            
            # As a fallback, we'll use the WHO GHO API to try to get the data
            # The indicator code for cutaneous leishmaniasis cases is likely in the URL
            indicator_code = url.split('/')[-1]
            gho_api_url = f'https://apps.who.int/gho/athena/api/GHO/{indicator_code}?format=json'
            
            try:
                api_response = requests.get(gho_api_url)
                api_response.raise_for_status()
                api_data = api_response.json()
                print(f"Retrieved data from WHO GHO API")
                
                # Process the API data into a DataFrame
                # The structure of the API response would need to be examined
                # This is a placeholder for the actual processing
                return pd.DataFrame(api_data)
            except Exception as e:
                print(f"Error retrieving data from WHO GHO API: {e}")
    
    except Exception as e:
        print(f"Error scraping WHO data: {e}")
    
    # If all methods fail, return an empty DataFrame
    return pd.DataFrame()

def save_data_to_json(data, filename='leishmaniasis_data.json'):
    """
    Saves the scraped data to a JSON file in the static directory.
    """
    # Convert DataFrame to JSON
    if isinstance(data, pd.DataFrame):
        data_dict = data.to_dict(orient='records')
    else:
        data_dict = data
    
    # Define the path to save the JSON file
    static_dir = Path(__file__).resolve().parent / 'static' / 'home' / 'json'
    static_dir.mkdir(parents=True, exist_ok=True)
    
    json_path = static_dir / filename
    
    # Save the data to a JSON file
    with open(json_path, 'w') as f:
        json.dump(data_dict, f, indent=2)
    
    print(f"Data saved to {json_path}")
    return str(json_path)

if __name__ == "__main__":
    # When run directly, scrape the data and save it to a JSON file
    data = scrape_who_leishmaniasis_data()
    if not data.empty:
        save_data_to_json(data)
    else:
        print("No data was scraped.")