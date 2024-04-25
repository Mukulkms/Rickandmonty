import Header from "./header";
import Footer from "./footer";
const Charinfo = () => {
    return (
         
        <div>
            <Header/>
            {/* Character card container */}
            <div className="character-info">
                <div className="char-details">
                    <div className="char-pic">
                        <img src="/1.jpeg" alt=""/>
                    </div>
                    <div className="charinfo">
                        <h2>Information</h2>
                        <p>Name</p>
                        <p>Status</p>
                        <p>Species</p>
                        <p>Type</p>
                        <p>Gender</p>
                        <p>Created</p>

                        <h2>Origin</h2>
                        <p>Name</p>
                        <p>Type</p>
                        <p>Dimension</p>
                        <p>Created</p>


                        <h2>Location</h2>
                        <p>Name</p>
                        <p>Type</p>
                        <p>Dimension</p>
                        <p>Created</p>
                    </div>

                </div>
            </div>
           <Footer/>
        </div>
    )
}

export default Charinfo;