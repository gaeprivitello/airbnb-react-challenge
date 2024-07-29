# REACT WEB AirBnb Challenge

Develop a map screen displaying a list of properties in New York City, similar to the property browsing experience on Airbnb. This challenge aims to assess your ability to handle geospatial data, create an interactive UI, and optimize performance for a medium/large dataset.

[Figma Designs](https://www.figma.com/design/jOHU3HUTOVb1K7AJBjfWsg/Lockhop-Coding-Test?node-id=7002-40123&t=Rmlnnv0hQgTkZqMs-0)

![Screenshot 2024-07-24 at 4 55 32 PM](https://github.com/user-attachments/assets/441c8e33-237e-4682-b238-6edc976a048f)


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Set up the `.env` file based on `.env.sample`

3. Start the app

   ```bash
    npm run dev
   ```

## Components to be implemented:

1. **Search bar** (MANDATORY): The search bar should allow the users to filter out properties within NYC. As the user types, both the map and the list should update. 
2. **Listings map** (MANDATORY): The map should allow to visualize the locations of these properties with a custom marker.
3. **Listing card** (MANDATORY): This card will be used to display the minimum amount of data for the listings, as shown in the designs. 

## Requirements

* Application Look&Feel is as close as of the design mockups. You’re free to improve the UX as much as you consider.
* The application should be mobile responsive
* Fetch data from the provided source to populate the listing cards and map. The amount of the initial load should be of at least 50 properties.
* The search bar should populate with data from the data source as well

## Evaluation criteria

* Completion of the functionality.
* Accuracy of the design (UI and UX).
* Code structure and strategy used.
* Code cleanliness.

## Technical details

* The code should be written in TypeScript.
* Free to use CSS/SCSS, TailwindCSS, Styled Components or a combination of both. Just keep in mind to have clean code as result.
* Make sure the code compiles with NodeJS +v20

## API Data Service

The web service has a GraphQL implementation in order to expose listed properties within 10 miles of New York City’s Downtown.

There’s only one query that app must consume, and that’s the one detailed below:

```
query listingsPageQuery($input: PageQueryInput) {
  listings: listingsPage(input: $input) {
    _id
    address {
      street
      location {
        coordinates
      }
    }
    guests_included
    bathrooms
    bedrooms
    beds
    images {
      picture_url
    }
    last_scraped
    listing_url
    price
  }
}
```

Where `input` is defined as follows:

```
input PageQueryInput {
  skip: Int
  limit: Int
  search: String! // a search string that has to be provided
}
```

- `search`: (Required) It must be provided, at least with empty string. This will allow the client to search properties by `name`, `street address`, `borough` and `suburb`.

- `limit`: (Required) It will limit the amount of records returned to the client.

- `skip`: (Optional) It allows the client to skip X amount of datasets. Useful for paginations.
