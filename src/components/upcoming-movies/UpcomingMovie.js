// ===== Container
// import all modules
import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import push from '../../helpers/push';
import http from '../../services/Services';

// import actions
import loading from '../../redux/actions/loading';

// import all components
import Container from '../container/Container';
import {Header, Title, UpcomingStyle, Subtitle, Main} from './styles';
import {CardUpcoming, MiniLoading, MiniMessage} from '../';
import Button from '../button/Button';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

class UpcomingMovieComponent extends Component {
  state = {
    movies: [],
    message: null,
    loading: false,
    month: 'september',
  };

  componentDidMount() {
    this.fetchDataStart();
  }

  fetchDataStart = async () => {
    this.setState((state) => ({
      loading: !state.loading,
    }));
    try {
      const {data} = await http.getUpcoming(this.state.month);
      setTimeout(() => {
        this.setState((state) => ({
          movies: data.results,
          loading: !state.loading,
        }));
      }, 500);
    } catch (err) {
      console.log(err);
      this.setState((state) => ({
        message: err.response.data.message,
        loading: !state.loading,
      }));
    }
  };

  componentDidUpdate(props, state) {
    this.fetchDataUpdate(state);
  }

  fetchDataUpdate = async (state) => {
    if (state.month !== this.state.month) {
      this.setState((currentState) => ({
        loading: !currentState.loading,
      }));
      try {
        const {data} = await http.getUpcoming(this.state.month);
        setTimeout(() => {
          this.setState((currentState) => ({
            movies: data.results,
            loading: !currentState.loading,
          }));
        }, 500);
      } catch (err) {
        console.log(err);
        this.setState((currentState) => ({
          message: err.response.data.message,
          loading: !currentState.loading,
          movies: [],
        }));
      }
    }
  };

  handleMonth = (month) => {
    this.setState({month});
  };

  render() {
    const months = [
      'September',
      'October',
      'November',
      'December',
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
    ];

    return (
      <Fragment>
        <UpcomingStyle>
          <Container>
            <Header>
              <Title>Now Showing</Title>
              <TouchableOpacity onPress={() => push(this.props, 'View All')}>
                <Subtitle>View All</Subtitle>
              </TouchableOpacity>
            </Header>
            <Header>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {months.map((item, index) => (
                  <View key={String(index)} style={styled.button}>
                    {item.toLowerCase() === this.state.month ? (
                      <Button
                        height="40px"
                        width="120px"
                        primary
                        onPress={() => this.handleMonth(item.toLowerCase())}>
                        {item}
                      </Button>
                    ) : (
                      <Button
                        height="40px"
                        width="120px"
                        onPress={() => this.handleMonth(item.toLowerCase())}>
                        {item}
                      </Button>
                    )}
                  </View>
                ))}
              </ScrollView>
            </Header>
            {this.state.loading ? (
              <MiniLoading />
            ) : this.state.movies.length < 1 ? (
              <MiniMessage message={this.state.message} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Main>
                  {this.state.movies.map((item, index) => (
                    <Fragment key={String(index)}>
                      <CardUpcoming
                        style={styled.card}
                        {...this.props}
                        poster={item.poster}
                        genres={item.genres}
                        title={item.title}
                        id={item.id}
                      />
                    </Fragment>
                  ))}
                </Main>
              </ScrollView>
            )}
          </Container>
        </UpcomingStyle>
      </Fragment>
    );
  }
}

const styled = StyleSheet.create({
  card: {
    marginRight: 20,
  },
  button: {
    marginRight: 10,
  },
});

const mapStateToProps = (state) => ({
  ...state.home,
});

const mapDispatchToProps = {
  loading,
};

export const UpcomingMovie = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpcomingMovieComponent);
