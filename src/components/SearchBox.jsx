import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const submitHandler =(e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate("/search/" +keyword)
        }else{
            navigate('/')
        }
    }

  return (
    <form onSubmit={submitHandler}>
    <div className="form-group d-flex">
        <input id='keyword' name="keyword" type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search product..." className="form-control mr-sm-2 ml-sm-5" />
        <button type="submit" className="btn btn-outline-success p-2 ms-2">Search</button>
    </div>
    </form>
  )
}

export default SearchBox