

To run the robot tests in `Docker`:

```sh

git clone git@github.com:uillinois-community/uillinois-community.github.io.git
cd uillinois-community.github.io
docker run -v ${PWD}/tests/robot/reports:/opt/robotframework/reports:Z -v ${PWD}/tests/robot:/opt/robotframework/tests:Z ppodgorsek/robot-framework:latest
```