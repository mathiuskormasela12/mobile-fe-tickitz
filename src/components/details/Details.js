// ===== Container
// import all modules
import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import http from '../../services/Services';
import loading from '../../redux/actions/loading';

// import all components
import {
  Detail,
  styles,
  Title,
  Header,
  Subtitle,
  Main,
  Column,
  LittleSubtitle,
  LittleTitle,
  Footer,
  Synopsis,
  SynopsisTitle,
} from './styles';
import Container from '../container/Container';
import {CardNowMoviePlain} from '../';

class DetailsComponent extends Component {
  state = {
    details: [],
    message: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.props.loading();
    try {
      const {data} = await http.getMovieDetails(this.props.route.params.id);
      this.setState(() => ({
        details: {
          ...data.results[0],
          duration: `${
            Number(data.results[0].duration.split(':')[0][0]) === 0
              ? data.results[0].duration.split(':')[0][1]
              : data.results[0].duration.split(':')[0]
          } hours ${data.results[0].duration.split(':')[1]} minutes`,
        },
      }));
      this.props.loading();
    } catch (err) {
      console.log(err);
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 2000,
        hideOnPress: true,
      });
      this.props.loading();
    }
  };

  render() {
    return (
      <Fragment>
        <Detail>
          <Container style={styles.container}>
            <CardNowMoviePlain poster={this.state.details.poster} />
            <Header>
              <Title>{this.state.details.title}</Title>
              <Subtitle>{this.state.details.genres}</Subtitle>
            </Header>
            <Main>
              <Column>
                <LittleTitle>Release date</LittleTitle>
                <LittleSubtitle>
                  {this.state.details.releaseDate}
                </LittleSubtitle>
              </Column>
              <Column>
                <LittleTitle>Directed by</LittleTitle>
                <LittleSubtitle>{this.state.details.direct}</LittleSubtitle>
              </Column>
              <Column>
                <LittleTitle>Duration</LittleTitle>
                <LittleSubtitle>{this.state.details.duration}</LittleSubtitle>
              </Column>
              <Column>
                <LittleTitle>Casts</LittleTitle>
                <LittleSubtitle>{this.state.details.casts}</LittleSubtitle>
              </Column>
            </Main>
            <Footer>
              <SynopsisTitle>Synopsis</SynopsisTitle>
              <Synopsis>{this.state.details.synopsis}</Synopsis>
            </Footer>
          </Container>
        </Detail>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.home,
});

const mapDispatchToProps = {
  loading,
};

export const Details = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsComponent);
