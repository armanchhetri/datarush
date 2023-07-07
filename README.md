# DataRush

DataRush is a data science competition platform similar to Kaggle. It enables you to host competitions, allowing users to log in, submit data, and view live scorecards. The repository consists of two top-level directories: `backend` containing the Python code with the FastAPI framework, and `frontend` containing the React code.

## Features

- **Competition Hosting**: DataRush allows you to host data science competitions, providing a platform for participants to showcase their skills and compete against each other.
- **User Authentication**: Users can create accounts, log in, and access competition-specific resources.
- **Data Submission**: Participants can submit their predictions or solutions for competitions through the platform.
- **Live Scorecards**: DataRush provides real-time scorecards to display competition rankings and updates as submissions are evaluated.
- **Backend with FastAPI**: The `backend` directory contains the Python code implementing the server-side functionality using the FastAPI framework.
- **Frontend with React**: The `frontend` directory contains the React code for the user interface, enabling an interactive and intuitive user experience.

## Installation and Setup

To run DataRush locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/datarush.git`
2. Navigate to the project directory: `cd datarush`
3. Set up the backend:
   - Install the required Python dependencies: `pip install -r backend/requirements.txt`
   - Start the backend server: `uvicorn backend.main:app --reload`
4. Set up the frontend:
   - Navigate to the `frontend` directory: `cd frontend`
   - Install the required Node.js dependencies: `npm install`
   - Start the frontend server: `npm start`
5. Access DataRush in your web browser at `http://localhost:3000`.

Please note that additional configuration steps may be required based on your specific environment and deployment needs.

## Contributing

Contributions to DataRush are welcome! If you would like to contribute, please follow these guidelines:
- Fork the repository and create a new branch for your feature or bug fix.
- Commit your changes and push the branch to your forked repository.
- Submit a pull request describing your changes.

## License
Do whatever you want to do with this codebase.
