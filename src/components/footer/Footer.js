// ===== Footer
// import all modules
import React, {Fragment, Component} from 'react';

// import all components
import {
  FooterStyle,
  Container,
  Header,
  Image,
  Subtitle,
  Section,
  TitleList,
  List,
  ListItems,
  Sponsor,
  ListFollow,
  ListSponsor,
  Follow,
  Text,
} from './styles';

// import img
import logo from '../../assets/img/logo.png';
import ebv from '../../assets/img/ebv.png';
import cineone from '../../assets/img/cineone.png';
import hiflix from '../../assets/img/hiflix.png';
import fb from '../../assets/img/fb.png';
import ig from '../../assets/img/ig.png';
import twitter from '../../assets/img/twitter.png';
import yt from '../../assets/img/yt.png';

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <FooterStyle>
          <Container>
            <Header>
              <Image source={logo} />
              <Subtitle>
                Stop waiting in line. Buy tickets conveniently, watch movies
                quietly.
              </Subtitle>
            </Header>
            <Section>
              <TitleList>Explorer</TitleList>
              <List>
                <ListItems>Cinemas</ListItems>
                <ListItems>Movies List</ListItems>
                <ListItems>Notifications</ListItems>
                <ListItems>My Ticket</ListItems>
              </List>
            </Section>
            <Section>
              <TitleList>Our Sponsor</TitleList>
              <ListSponsor>
                <Sponsor width={80} height={25} source={ebv} />
                <Sponsor width={80} height={25} source={cineone} />
                <Sponsor width={80} height={25} source={hiflix} />
              </ListSponsor>
            </Section>
            <Section>
              <TitleList>Follow Us</TitleList>
              <ListFollow>
                <Follow width={12} height={20} source={fb} />
                <Follow width={20} height={20} source={ig} />
                <Follow width={18} height={18} source={twitter} />
                <Follow width={20} height={20} source={yt} />
              </ListFollow>
            </Section>
            <Text>© 2023 Tickitz. All Rights Reserved.</Text>
          </Container>
        </FooterStyle>
      </Fragment>
    );
  }
}

export {Footer};
