import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );
  
  const ButtonBar = ({ message, disabled }) => {
    return (
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
        <span className="p-2">{message}</span>
      </div>
    );
  };

const validateInput = (title, time) => {
    switch (title) {
      case 'title':
        return /(^\w\w)/.test(time) ? '' : 'Course title must be least two characters';
      case 'meets':
        return (/^[\s]*$/.test(time) || /(M|Tu|W|Th|F)+ (\d\d?)+:(\d\d)+-(\d\d?)+:(\d\d)/.test(time)) ? '' : 'The date must be in the following format, e.g., MWF 12:00-13:20';
      default: return '';
    }
  };

  const ActiveModalEditCourse = ({course, id}) => {
    const [update, result] = useDbUpdate(`/courses/${course.id}`);
    const [state, change] = useFormData(validateInput, course);
    const submit = (evt) => {
      evt.preventDefault();
      if (!state.errors) {
        update(state.values);
      }
    };
  
    return (
        <div>
            
            <h1>Edit Course:</h1>
            <form
                onSubmit={submit}
                noValidate
                className={state.errors ? "was-validated" : null}
            >
                <InputField
                name="title"
                text="Course Title"
                state={state}
                change={change}
                />
                <InputField
                name="meets"
                text="Meeting Time"
                state={state}
                change={change}
                />
                <ButtonBar message={result?.message} />
            </form>
      </div>
    );
};

export default ActiveModalEditCourse;