import React from 'react';
import './App.css';

import me from './img/front-visual-me-outlined.png';
import placeholder from './img/placeholder.png';
import $ from 'jquery';

import '../node_modules/font-awesome/css/font-awesome.min.css';

$(document).ready(function () {
    // @codekit-prepend "/vendor/hammer-2.0.8.js";
    // DOMMouseScroll included for firefox support
    var canScroll = true,
        scrollController = null;
    $(this).on('mousewheel DOMMouseScroll', function (e) {

        if (!($('.outer-nav').hasClass('is-vis'))) {

            e.preventDefault();

            var delta = (e.originalEvent.wheelDelta) ? -e.originalEvent.wheelDelta : e.originalEvent.detail * 20;

            if (delta > 50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function () {
                    canScroll = true;
                }, 800);
                updateHelper(1);
            }
            else if (delta < -50 && canScroll) {
                canScroll = false;
                clearTimeout(scrollController);
                scrollController = setTimeout(function () {
                    canScroll = true;
                }, 800);
                updateHelper(-1);
            }

        }

    });

    $('.side-nav li, .outer-nav li').click(function () {

        if (!($(this).hasClass('is-active'))) {

            var $this = $(this),
                curActive = $this.parent().find('.is-active'),
                curPos = $this.parent().children().index(curActive),
                nextPos = $this.parent().children().index($this),
                lastItem = $(this).parent().children().length - 1;

            updateNavs(nextPos);
            updateContent(curPos, nextPos, lastItem);

        }

    });

    $('.cta').click(function () {

        var curActive = $('.side-nav').find('.is-active'),
            curPos = $('.side-nav').children().index(curActive),
            lastItem = $('.side-nav').children().length - 1,
            nextPos = lastItem;

        updateNavs(lastItem);
        updateContent(curPos, nextPos, lastItem);

    });


    $(document).keyup(function (e) {

        if (!($('.outer-nav').hasClass('is-vis'))) {
            e.preventDefault();
            updateHelper(e);
        }

    });

    // determine scroll, swipe, and arrow key direction
    function updateHelper(param) {

        var curActive = $('.side-nav').find('.is-active'),
            curPos = $('.side-nav').children().index(curActive),
            lastItem = $('.side-nav').children().length - 1,
            nextPos = 0;

        if (param.type === "swipeup" || param.keyCode === 40 || param > 0) {
            if (curPos !== lastItem) {
                nextPos = curPos + 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
            else {
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
        }
        else if (param.type === "swipedown" || param.keyCode === 38 || param < 0) {
            if (curPos !== 0) {
                nextPos = curPos - 1;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
            else {
                nextPos = lastItem;
                updateNavs(nextPos);
                updateContent(curPos, nextPos, lastItem);
            }
        }

    }

    // sync side and outer navigations
    function updateNavs(nextPos) {

        $('.side-nav, .outer-nav').children().removeClass('is-active');
        $('.side-nav').children().eq(nextPos).addClass('is-active');
        $('.outer-nav').children().eq(nextPos).addClass('is-active');

    }

    // update main content area
    function updateContent(curPos, nextPos, lastItem) {

        $('.main-content').children().removeClass('section--is-active');
        $('.main-content').children().eq(nextPos).addClass('section--is-active');
        $('.main-content .section').children().removeClass('section--next section--prev');

        if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
            $('.main-content .section').children().removeClass('section--next section--prev');
        }
        else if (curPos < nextPos) {
            $('.main-content').children().eq(curPos).children().addClass('section--next');
        }
        else {
            $('.main-content').children().eq(curPos).children().addClass('section--prev');
        }

        if (nextPos !== 0 && nextPos !== lastItem) {
            $('.header--cta').addClass('is-active');
        }
        else {
            $('.header--cta').removeClass('is-active');
        }

    }

    function outerNav() {

        $('.header--nav-toggle').click(function () {

            $('.perspective').addClass('perspective--modalview');
            setTimeout(function () {
                $('.perspective').addClass('effect-rotate-left--animate');
            }, 25);
            $('.outer-nav, .outer-nav li, .outer-nav--return').addClass('is-vis');

        });

        $('.outer-nav--return, .outer-nav li').click(function () {

            $('.perspective').removeClass('effect-rotate-left--animate');
            setTimeout(function () {
                $('.perspective').removeClass('perspective--modalview');
            }, 400);
            $('.outer-nav, .outer-nav li, .outer-nav--return').removeClass('is-vis');

        });

    }

    function workSlider() {

        $('.slider--prev, .slider--next').click(function () {

            var $this = $(this),
                curLeft = $('.slider').find('.slider--item-left'),
                curLeftPos = $('.slider').children().index(curLeft),
                curCenter = $('.slider').find('.slider--item-center'),
                curCenterPos = $('.slider').children().index(curCenter),
                curRight = $('.slider').find('.slider--item-right'),
                curRightPos = $('.slider').children().index(curRight),
                totalWorks = $('.slider').children().length,
                $left = $('.slider--item-left'),
                $center = $('.slider--item-center'),
                $right = $('.slider--item-right'),
                $item = $('.slider--item');

            $('.slider').animate({ opacity: 0 }, 400);

            setTimeout(function () {

                if ($this.hasClass('slider--next')) {
                    if (curLeftPos < totalWorks - 1 && curCenterPos < totalWorks - 1 && curRightPos < totalWorks - 1) {
                        $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                    }
                    else {
                        if (curLeftPos === totalWorks - 1) {
                            $item.removeClass('slider--item-left').first().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                        }
                        else if (curCenterPos === totalWorks - 1) {
                            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                            $item.removeClass('slider--item-center').first().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').next().addClass('slider--item-right');
                        }
                        else {
                            $left.removeClass('slider--item-left').next().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').next().addClass('slider--item-center');
                            $item.removeClass('slider--item-right').first().addClass('slider--item-right');
                        }
                    }
                }
                else {
                    if (curLeftPos !== 0 && curCenterPos !== 0 && curRightPos !== 0) {
                        $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                        $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                        $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                    }
                    else {
                        if (curLeftPos === 0) {
                            $item.removeClass('slider--item-left').last().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                        }
                        else if (curCenterPos === 0) {
                            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                            $item.removeClass('slider--item-center').last().addClass('slider--item-center');
                            $right.removeClass('slider--item-right').prev().addClass('slider--item-right');
                        }
                        else {
                            $left.removeClass('slider--item-left').prev().addClass('slider--item-left');
                            $center.removeClass('slider--item-center').prev().addClass('slider--item-center');
                            $item.removeClass('slider--item-right').last().addClass('slider--item-right');
                        }
                    }
                }

            }, 400);

            $('.slider').animate({ opacity: 1 }, 400);

        });

    }

    function transitionLabels() {

        $('.work-request--information input').focusout(function () {

            var textVal = $(this).val();

            if (textVal === "") {
                $(this).removeClass('has-value');
            }
            else {
                $(this).addClass('has-value');
            }

            // correct mobile device window position
            window.scrollTo(0, 0);

        });

    }

    outerNav();
    workSlider();
    transitionLabels();

});

function App() {
  return (
    <div className="App">
          <div className="device-notification">
  <a className="device-notification--logo" href="#0">
    <p>Giofolio</p>
  </a>
  <p className="device-notification--message">Detected landscape mode. Please switch to portrait mode for the full experience!</p>
</div>

<div className="perspective effect-rotate-left">
  <div className="container"><div className="outer-nav--return"></div>
    <div id="viewport" className="l-viewport">
      <div className="l-wrapper">
        <header className="header">
          <a className="header--logo" href="#0">
           
            <p>Giofolio</p>
          </a>
          <button className="header--cta cta">Neem contact</button>
          <div className="header--nav-toggle">
            <span></span>
          </div>
        </header>
        <nav className="l-side-nav">
          <ul className="side-nav">
            <li className="is-active"><span>Home</span></li>
            <li><span>Portfolio</span></li>
            <li><span>Over mij</span></li>
            <li><span>Contact</span></li>
            <li><span>Opdracht</span></li>
          </ul>
        </nav>
        <ul className="l-main-content main-content">
          <li className="l-section section section--is-active">
            <div className="intro">
              <div className="intro--banner">
                                          <h1>> Frontend<br />&nbsp;&nbsp;&nbsp;Developer</h1>
                  <button className="cta is-active">Dien een opdracht in</button>
                                          {/* 
                <button className="cta">Hire me
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118" style="enable-background:new 0 0 150 118;" xml:space="preserve">
                  <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                    <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z"/>
                  </g>
                  </svg>
                  <span className="btn-background"></span>
                </button>
                                           */ }
                
              <img src={me} alt="Welcome" />
              </div>
              <div className="intro--options">
                <a href="#0">
                  <ul>
                    <li><i className="fa fa-instagram fa-3x"></i></li>
                    <li><i className="fa fa-flickr fa-3x"></i></li>
                    <li><i className="fa fa-linkedin fa-3x"></i></li>
                  </ul>
                </a>
                <a href="#0"></a>
              </div>
            </div>
          </li>
          <li className="l-section section">
            <div className="work">
              <h2>Mijn werk</h2>
              <div className="work--lockup">
                <ul className="slider">
                  <li className="slider--item slider--item-left">
                    <a href="#0">
                      <div className="slider--item-image">
                        <img src={placeholder} />
                      </div>
                      <p className="slider--item-title">Titel</p>
                      <p className="slider--item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
                    </a>
                  </li>
                  <li className="slider--item slider--item-center">
                    <a href="#0">
                      <div className="slider--item-image">
                        <img src={placeholder} />
                      </div>
                      <p className="slider--item-title">Titel</p>
                      <p className="slider--item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
                    </a>
                  </li>
                  <li className="slider--item slider--item-right">
                    <a href="#0">
                      <div className="slider--item-image">
                        <img src={placeholder} />
                      </div>
                      <p className="slider--item-title">Titel</p>
                      <p className="slider--item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
                    </a>
                  </li>
                  <li className="slider--item">
                    <a href="#0">
                      <div className="slider--item-image">
                        <img src={placeholder} />
                      </div>
                      <p className="slider--item-title">Titel</p>
                      <p className="slider--item-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do.</p>
                    </a>
                  </li>
                </ul>
                <div className="slider--prev">
                    <i className="fa fa-arrow-left"></i>

                    {/*
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 150 118" style="enable-background:new 0 0 150 118;" xml:space="preserve">
                  <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                    <path d="M561,1169C525,1155,10,640,3,612c-3-13,1-36,8-52c8-15,134-145,281-289C527,41,562,10,590,10c22,0,41,9,61,29
                    c55,55,49,64-163,278L296,510h575c564,0,576,0,597,20c46,43,37,109-18,137c-19,10-159,13-590,13l-565,1l182,180
                    c101,99,187,188,193,199c16,30,12,57-12,84C631,1174,595,1183,561,1169z"/>
                  </g>
                  </svg>
                   */}
                </div>
                                          <div className="slider--next">
                                              <i className="fa fa-arrow-right"></i>

                                              {/*
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 150 118" style="enable-background:new 0 0 150 118;" xml:space="preserve">
                  <g transform="translate(0.000000,118.000000) scale(0.100000,-0.100000)">
                    <path d="M870,1167c-34-17-55-57-46-90c3-15,81-100,194-211l187-185l-565-1c-431,0-571-3-590-13c-55-28-64-94-18-137c21-20,33-20,597-20h575l-192-193C800,103,794,94,849,39c20-20,39-29,61-29c28,0,63,30,298,262c147,144,272,271,279,282c30,51,23,60-219,304C947,1180,926,1196,870,1167z"/>
                  </g>
                  </svg>
                   */}
                </div>
              </div>
            </div>
          </li>
          <li className="l-section section">
            <div className="about">
              <div className="about--banner">
                <h2>Creatief<br />inzicht</h2>
                <h3>Laatse jaars student;</h3>
                <h3>Frontend enthusiast;</h3>
                <h3>React & Javascript focussed;</h3>
              </div>
              <div className="about--options">
                <a href="#0">
                  <h3>Web design</h3>

                </a>
                <a href="#0">
                  <h3>Web dev</h3>
                </a>
              </div>
            </div>
          </li>
          <li className="l-section section">
            <div className="contact">
              <div className="contact--lockup">
                <div className="modal">
                  <div className="modal--information">
                    <p>Emst, Netherlands</p>
                    <a href="mailto:Giovanni@Dogger.nl">Giovanni@Dogger.nl</a>
                    <a href="tel:+31636024765">+31 6 360 247 65</a>
                  </div>
                  <ul className="modal--options">
                    <li><a href="mailto:Giovanni@Dogger.nl">Neem contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="l-section section">
            <div className="hire">
              <h2>Ik ben op zoek naar</h2>

              <form className="work-request">
                <div className="work-request--options">

                  <span className="options-b">
                    <input id="opt-4" type="checkbox" value="ux design" />
                    <label htmlFor="opt-4">
                                                  {/*
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 150 111" style="enable-background:new 0 0 150 111;" xml:space="preserve">
                      <g transform="translate(0.000000,111.000000) scale(0.100000,-0.100000)">
                        <path d="M950,705L555,310L360,505C253,612,160,700,155,700c-6,0-44-34-85-75l-75-75l278-278L550-5l475,475c261,261,475,480,475,485c0,13-132,145-145,145C1349,1100,1167,922,950,705z"/>
                      </g>
                      </svg>
                       */}
                      Webdesign
                    </label>
                    <input id="opt-5" type="checkbox" value="webdesign" />
                                              <label htmlFor="opt-5">
                                                  {/*
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 150 111" style="enable-background:new 0 0 150 111;" xml:space="preserve">
                      <g transform="translate(0.000000,111.000000) scale(0.100000,-0.100000)">
                        <path d="M950,705L555,310L360,505C253,612,160,700,155,700c-6,0-44-34-85-75l-75-75l278-278L550-5l475,475c261,261,475,480,475,485c0,13-132,145-145,145C1349,1100,1167,922,950,705z"/>
                      </g>
                      </svg>
                                               */}
                     Webdevelopment
                    </label>
                  </span>
                </div>

                <div className="work-request--information">
                  <div className="information-name">
                    <input id="name" type="text" spellCheck="false" />
                    <label htmlFor="name">Naam</label>
                  </div>
                  <div className="information-email">
                    <input id="email" type="email" spellCheck="false" />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <input type="submit" value="Verstuur" />
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>


  <ul className="outer-nav">
    <li className="is-active">Home</li>
    <li>Login</li>
  </ul>
          </div>
          <script src="https://kit.fontawesome.com/0df44b18c2.js"></script>
          <script src="/js/functions.js"></script>
      </div >


        
  );
}


export default App;
