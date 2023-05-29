## Weather App Documentation

### Overview
The Weather App is a web application that provides users with real-time weather information for different cities around the world. It allows users to add cities, view weather details, and manage their favorite cities.

### Technologies Used
- Front-end:
  - React: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for managing the application's state.
  - React-Redux: A library that integrates React with Redux.
  - React Icons: A collection of customizable icons for React applications.
  - React Hot Toast: A toast notification library for React applications.
  - CSS: Styling the components and layout of the application.
- Back-end:
  - OpenWeatherMap API: An API that provides weather data for various locations.

### Features

#### 1. City Management
- Users can add cities to their list of tracked cities.
- Existing cities can be deleted from the list.
- The list of tracked cities is stored locally using `localStorage` for persistence.

#### 2. Weather Details
- Weather information is fetched from the OpenWeatherMap API for each city.
- The weather details include temperature, description, humidity, and wind speed.
- Temperature is displayed in Celsius.
- Weather details are displayed in a card format for easy viewing.

#### 3. Favorites
- Users can mark cities as favorites.
- Favorite cities are visually distinguished and can be easily identified.
- Favorite cities are stored in the Redux store and persisted using `localStorage`.

#### 4. Error Handling
- If there is an error fetching weather data for a city, an appropriate error message is displayed.
- Error messages are handled gracefully to provide a smooth user experience.

### Folder Structure
- `components`: Contains reusable components used in different parts of the application.
- `redux`: Contains Redux-related files, including actions, reducers, and action types.
- `services`: Contains services for interacting with APIs and handling data.

### Setup and Deployment
To run the Weather App locally, follow these steps:
1. Clone the repository from [GitHub Repository URL].
2. Navigate to the project directory.
3. Install the necessary dependencies by running `npm install` or `yarn install`.
4. Start the application by running `npm start` or `yarn start`.
5. Access the application in your browser at `http://localhost:3000`.

To deploy the Weather App to a production environment, follow the deployment instructions for your chosen hosting platform.

### Conclusion
The Weather App provides users with an intuitive and convenient way to access weather information for various cities. Its user-friendly interface, city management features, and real-time weather updates make it a valuable tool for users seeking accurate and up-to-date weather data.
