import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserHeader = (props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const userName = props.userName;
    
    useEffect(() => {
        if (!userName) navigate('/login', { replace: true });
    },[]);

    return (
        <>
        <div className="container-fluid bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-dark d-none d-lg-block">
                    <a href="index.php" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 text-primary text-uppercase">Brain Blitz</h1>
                    </a>
                </div>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                        <a href="index.php" className="navbar-brand d-block d-lg-none">
                            <h1 className="m-0 text-primary text-uppercase">Brain Blitz</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <a href="index.php" className="nav-item nav-link">Home</a>
                                <a href="varities.php" className="nav-item nav-link" >Varieties</a>
                                <a href="posting.php" className="nav-item nav-link">Post a pet</a>
                                <a href="testimonial.php" className="nav-item nav-link">Testimonials</a>
                                <a href="room.php" className="nav-item nav-link active">Pets</a>

                                <a href="contact.php" className="nav-item nav-link">Contact</a>
                                <a href="donation.php" className="nav-item nav-link">Donate</a>
                            </div>
                            <a href="http://localhost:8081/Pawsome/login.jsp" className="btn btn-primary rounded-0 py-4 px-md-5 d-none d-lg-block">Sign In / Log In<i className="fa fa-arrow-right ms-3"></i></a>                        </div>
                    </nav>
                </div>
            </div>
        </div>
        </>
    );
}

export default UserHeader;