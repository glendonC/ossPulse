# OSS Pulse
- OSS Pulse aims to track and analyze open-source contributions from around the globe. Gain valuable insights into the latest trends and top contributors within the vibrant open-source community. Visualize contribution data through stunning charts and forecasts, empowering you to make informed decisions and stay ahead in the ever-evolving landscape of open-source development.


## Features:
- **Real-time Contribution Tracking**: Stay up-to-date with the latest open source contributions as they happen, providing real-time insights into project activity and engagement.
- **Comprehensive Data Visualization**: Visualize open source contribution trends over time using dynamic and interactive charts. Understand user activity, repository popularity, and language usage patterns effortlessly.
- **Contribution Forecasting**: Utilize AI-driven contribution forecasting to predict future trends and anticipate potential surges in project participation.
- **Open Source and Community-driven**: As an open source project itself, OSS Pulse welcomes contributions from the community, ensuring constant improvements and innovation.

  
# Prerequisites
- Python 3.x
- Angular
- Node.js and npm


## Installing and Setup
1. Clone the repository:
  - git clone [<url-to-your-repo>](https://github.com/glendonC/ossPulse.git)

### Backend Setup:
2. cd osspulse/backend
3. Create a new virtual environment (recommended)
4. Activate the virtual environment ([my favorite tutorial](https://tutorial.djangogirls.org/en/django_installation/))
5. pip install -r requirements.txt
6. python main.py

Return to the root directory, HOWEVER

### Environment Variables
6.5. In order to use certain features, you will need to set up environment variables. Create a new file named `.env` in the backend directory and add the following:
- SECRET_KEY=your_secret_key_here
- API_KEY=your_api_key_here

### Frontend Setup:
7. cd osspulse/frontend_interface
8. npm install
9. ng serve



## Running Tests
- Currently, no tests are available for this application yet.

## Deployment
- Currently only runs on local servers.

## Built With
- Python (Backend development)
- Flask (Python web framework)
- Angular (Frontend development)
- Bootstrap (Frontend UI)
- Chart.js (JS Visualization Library)

## Contributing
- Please read CONTRIBUTING.md for details.

## Licensing
- This project is licensed under the MIT License - see the LICENSE.md file for details.

