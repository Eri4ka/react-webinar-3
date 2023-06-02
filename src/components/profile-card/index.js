import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileCard(props) {

  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h1 className={cn('title')}>{props.title}</h1>
      {props.fieldsList.map((field) => (
        <div key={field.id} className={cn('prop')}>
          <div className={cn('label')}>{field.label}</div>
          <div className={cn('value')}>{field.value}</div>
        </div>
      ))}
    </div>
  );
}

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  fieldsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string
  })).isRequired
};

export default ProfileCard;
