import React from 'react';

function Testimonial(){
    return (
        <div id="testimonials" className="carousel slide" data-ride="false">
            <div className="carousel-inner">
                <div className="carousel-item active">
                     <h3>
                     Horizon is one of the best websites. It has helped me a lot to express my self
                     and to find real audience who is interested in my Articles.
                     </h3>
                     <p>User 1</p>
                </div>
                <div className="carousel-item">
                    <h3>
                        Horizon is worth trying and it is a wonderful website.It helps everyone with
                        an awesome reading experience. It has millions of articles in a variety of topics.
                     </h3>
                     <p>User 2</p>
                </div>
                <div className="carousel-item">
                    <h3>
                        I really enjoy reading articles by the top experts in a field. 
                        I read in meditation, yoga and TECH and it made a significant impact in my life.
                     </h3>
                     <p>User 3</p>
                 </div>
            </div>
            <a className="carousel-control-prev" href="#testimonials" role="button" data-slide="prev">
                 <span className="carousel-control-prev-icon"></span>
                 <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#testimonials" role="button" data-slide="next">
                <span className="carousel-control-next-icon"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Testimonial;