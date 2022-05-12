import './SearchBox.css'
import {FaSearch} from 'react-icons/fa'
function Searchbox(props:any) {
  return (
    <div className='search-container'>
      <input type='text' placeholder='Search...' onChange={props.search}/>
      <FaSearch className='search-icon'/>
      </div>
  )
}

export default Searchbox