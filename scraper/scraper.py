import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime

# 1. Connect to your Database
# Make sure you have MongoDB installed locally!
client = MongoClient("mongodb+srv://mazharkhan983955:Apple1234@cluster0.ltxig.mongodb.net/?appName=Cluster0")
db = client.sydney_events
collection = db.events

def scrape_events():
    print("Scraping started...")
    url = "https://www.eventbrite.com.au/d/australia--sydney/all-events/"
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # This looks for event titles. 
        # Note: Site structures change often, so we'll check for generic h3 tags
        events = soup.find_all('h3') 
        
        for event in events:
            title = event.get_text().strip()
            
            event_data = {
                "title": title,
                "city": "Sydney",
                "status": "new",  # This is a requirement from your PDF!
                "last_scraped": datetime.now()
            }
            
            # This "Upserts" the data (Updates if exists, Inserts if new)
            collection.update_one(
                {"title": title},
                {"$set": event_data},
                upsert=True
            )
        print(f"Success! Saved {len(events)} events to the database.")
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    scrape_events()