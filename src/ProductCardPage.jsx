import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';


function ProductCardPage(){
    return(
        <div style = {{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}>
            
            <div style={{float: 'right', paddingRight: '40rem', paddingTop: '10rem'}}>
                <p>КЛАССИЧЕСКИЙ СТОЛ</p>
                <p>100 000 тенге</p>    
                <p style = {{background: 'lightgray', padding: '7px', textAlign:'center', borderRadius: '0.7rem'}}>На заказ</p>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Цвет
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Серый</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Кремовый</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Коричневый</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>       
        </div>
    );
}

export default ProductCardPage