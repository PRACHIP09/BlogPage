function Load() {
    return (
        <div className="container">
          <div className="row ">
            <div className="col d-flex justify-content-center my-5">
              
              {/*<div className="spinner-grow text-primary m-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-primary m-1" role="status">
                <span className="visually-hidden">Loading...</span>
    </div>*/}
              <div className="spinner-grow text-primary m-1" role="status" style={{fontSize:"1.2rem", margin:"15px", alignItems:"center"}}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Load