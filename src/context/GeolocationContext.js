import React, { Component } from 'react';

const defaultState = {
  loading: true,
  position: null,
  weather: null,
  error: null,
  getPosition: () => {},
};

const GeolocationContext = React.createContext(defaultState);

class GeolocationProvider extends Component {
  state = {
    loading: true,
    position: null,
    error: null,
    weather: null,
  };

  componentDidMount() {
    this.getWeather()
      .then(() => console.log('Have weather'))
      .catch(err => console.error(err));
  }

  getWeather = async () => {
    await this.getPosition();
    const { position } = this.state;
    if (!position) return alert('Unable to get position');

    const { latitude, longitude } = position.coords;
    const res = await fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=6b7cffbec4254c32a13dbfd968f009e7`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (res.ok) {
      const parsedRes = await res.json();
      this.setState({
        weather: parsedRes.data[0],
        loading: false,
      });
    }
  };

  getPosition = () =>
    new Promise((resolve, reject) => {
      console.log('Getting position');
      if (!navigator.geolocation) {
        const error = { message: `Geolocation not available` };
        this.setState({
          error,
        });
        reject(error);
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({
              position,
            });
            resolve(position);
          },
          error => {
            this.setState({ error });
            reject(error);
          }
        );
      }
    });

  render() {
    const { children } = this.props;
    const { loading, weather, position, error } = this.state;
    return (
      <GeolocationContext.Provider
        value={{
          loading,
          position,
          error,
          weather,
        }}
      >
        {children}
      </GeolocationContext.Provider>
    );
  }
}

export default GeolocationContext;

export { GeolocationProvider };
