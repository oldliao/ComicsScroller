// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from './ComicImage.css';
import { updateImgType } from '../../container/App/reducers/comics';

function getImgClass(type: string) {
  switch (type) {
    case 'normal':
      return cn.ComicImage;
    case 'wide':
      return cn.ComicImageWide;
    case 'natural':
      return cn.ComicImageNatural;
    case 'end':
      return cn.ComicImageEnd;
    default:
      return cn.ComicImageInit;
  }
}

export class ComicImage extends Component {
  state: {
    showImage: boolean,
  };

  props: {
    loading: boolean,
    src: number,
    type: string,
    index: Function,
    updateImgType: Function,
  };

  w: number;
  h: number;

  state = {
    showImage: false,
  };

  imgLoadHandler = e => {
    this.w = e.target.naturalWidth;
    this.h = e.target.naturalHeight;
    const innerHeight = window.innerHeight;
    if (this.h > innerHeight - 48) {
      if (this.w > this.h) {
        this.props.updateImgType(innerHeight - 68, this.props.index, 'wide');
      } else {
        this.props.updateImgType(1400, this.props.index, 'normal');
      }
    } else {
      this.props.updateImgType(this.h, this.props.index, 'natural');
    }
    this.setState({ showImage: true });
  };

  render() {
    return (
      <div className={getImgClass(this.props.type)}>
        {!this.state.showImage && this.props.type !== 'end'
          ? <div>Loading...</div>
          : undefined}
        {!this.props.loading && this.props.type !== 'end'
          ? <img
              style={this.state.showImage ? undefined : { display: 'none' }}
              src={this.props.src}
              onLoad={this.imgLoadHandler}
              alt={'comicImage'}
            />
          : undefined}
        {this.props.type === 'end' ? '本 章 結 束' : undefined}
      </div>
    );
  }
}

function makeMapStateToProps(state, props) {
  const { index } = props;
  return function mapStateToProps({ comics }) {
    return {
      src: comics.imageList.entity[index].src,
      loading: comics.imageList.entity[index].loading,
      type: comics.imageList.entity[index].type,
    };
  };
}

export default connect(makeMapStateToProps, {
  updateImgType,
})(ComicImage);
