import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';

class NavLinkBar extends Component {
  
  static propTypes = {
    navList: PropTypes.array.isRequired
  };
  
  render() {
    const navList = this.props.navList.filter(v => !v.hide);
    const {pathname} = this.props.location;
    return (
      <div className="tab-bar-wrap">
        <TabBar>
          {
            navList.map(v => {
              console.log(v);
              return (
                <TabBar.Item
                  badge={v.path === '/message' ? this.props.unRead: null}
                  key={v.path}
                  title={v.text}
                  icon={{uri: require(`static/icon/${v.icon}.png`)}}
                  selectedIcon={{uri: require(`static/icon/${v.icon}-active.png`)}}
                  selected={pathname === v.path}
                  onPress={() => {
                    console.log('v.path: ', v.path);
                    this.props.history.push(v.path);
                  }}
                >
                </TabBar.Item>
              )
            })
          }
        </TabBar>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  unRead: state.chat.unRead,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLinkBar));
