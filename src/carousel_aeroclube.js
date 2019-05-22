import React, { Component } from 'react';
import {Carousel, CarouselItem, CarouselProps, CarouselCaption} from 'react-bootstrap';
import './carousel.css';

class MyCarousel extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img
              className="d-block"
              src="https://www.aerosjc.com.br/site/images/slidefull//aeroclube2.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://www.ej.com.br/img/cessna172.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://aeroclubejf.com.br/wp-content/uploads/2019/02/Cessna-150.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      );
    }
  }
  
export default MyCarousel;