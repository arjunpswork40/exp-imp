import Input from "../../../Generals/Input";
import "./Colors.css"

function Colors({handleChange}) {
  return (
    <div>
      <h2 className="sidebar-title color-title">Colors</h2>
      <label className="sidebar-label-container">
            <input type="radio" onChange={handleChange} value="" name="test"/>
            <span className="checkmark all"></span>All
          </label>

          <Input
            handleChange={handleChange}
            value="black"
            title="black"
            name="test1"
            color="black"
          />
          <Input
            handleChange={handleChange}
            value="red"
            title="red"
            name="test1"
            color="red"
          />
          <Input
            handleChange={handleChange}
            value="blue"
            title="blue"
            name="test1"
            color="blue"
          />
          <Input
            handleChange={handleChange}
            value="green"
            title="green"
            name="test1"
            color="green"
          />
          <label className="sidebar-label-container">
            <input type="radio" onChange={handleChange} value="white" name="test1" />
            <span className="checkmark" style={{background:"white",border:"2px solid black"}}></span>White
          </label>
    </div>
  )
}
export default  Colors;