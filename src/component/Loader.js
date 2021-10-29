import React from 'react';
import {Row , Col} from 'react-bootstrap'
import {  BeatLoader } from 'react-spinners';
const Loader = () => {
    return (
        <div className ='d-flex justify-content-center mt-5' 
        style={{height : '40px' }}>
            <Row>
                <Col>
                
                </Col>
            </Row>
            <Row>
                <Col>
                <div className='mx-3'>
                    <strong style={{fontSize:"1.3rem"}}>
                    Saving your details
                    </strong>
                    <BeatLoader size={10} color='blue' loading/>
                    
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default Loader