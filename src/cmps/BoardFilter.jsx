import { useState, useEffect } from 'react'
import { boardService } from '../services/board'
import { loadBoard } from '../store/actions/board.actions'
import { useDispatch } from 'react-redux'

export function BoardFilter() {
    // const [ filterToEdit, setFilterToEdit ] = useState(structuredClone())
    const [ filterToEdit, setFilterToEdit ] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        filterBoard
        setFilterToEdit()
    }, [filterToEdit])

    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
        setFilterBy({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '' })
    }
    
    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    function handlePopoverClick(ev) {
        ev.stopPropagation();
      }

    return <section className="board-filter" onClick={handlePopoverClick}>
            <h3>Keyword</h3>
            <input
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="Enter a keyword"
                onChange={handleChange}
                required
            />
          
            <button 
                className="btn-clear" 
                onClick={clearFilter}>Clear</button>
    </section>
}
{/* <h3>Sort:</h3>
<div className="sort-field">
   
    <label>
        <span>Title</span>
        <input
            type="radio"
            name="sortField"
            value="title"
            checked={filterToEdit.sortField === 'title'}            
            onChange={handleChange}
        />
    </label>
    <label>
        <span>Owner</span>
        <input
            type="radio"
            name="sortField"
            value="owner"
            checked={filterToEdit.sortField === 'owner'}                        
            onChange={handleChange}
        />
    </label>
</div>
<div className="sort-dir">
    <label>
        <span>Asce</span>
        <input
            type="radio"
            name="sortDir"
            value="1"
            checked={filterToEdit.sortDir === 1}                        
            onChange={handleChange}
        />
    </label>
    <label>
        <span>Desc</span>
        <input
            type="radio"
            name="sortDir"
            value="-1"
            onChange={handleChange}
            checked={filterToEdit.sortDir === -1}                        
        />
    </label>
</div>
<button 
    className="btn-clear" 
    onClick={clearSort}>Clear</button> */}