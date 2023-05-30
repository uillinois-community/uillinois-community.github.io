

To run the robot tests in `Docker`:

```sh

git clone git@github.com:uillinois-community/uillinois-community.github.io.git
cd uillinois-community.github.io/tests
docker run -v ${PWD}/tests/reports:/opt/robotframework/reports:Z -v ${PWD}/tests:/opt/robotframework/tests:Z ppodgorsek/robot-framework:latest
```