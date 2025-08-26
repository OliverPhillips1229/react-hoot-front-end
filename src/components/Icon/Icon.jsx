import Add from '../../assets/images/add.svg';
import Edit from '../../assets/images/edit.svg';
import Like from '../../assets/images/like.svg';
import Liked from '../../assets/images/liked.svg';
import Music from '../../assets/images/music.svg';
import Trash from '../../assets/images/trash.svg';
import Create from '../../assets/images/create.svg';
import Comments from '../../assets/images/comments.svg';
import Calendar from '../../assets/images/calendar.svg';

const Icon = ({ category }) => {
  const icons = {
    Add: Add,

    Like: Like,
    Edit: Edit,
    Music: Music,
    Liked: Liked,
    Trash: Trash,
    Create: Create,
    Calendar: Calendar,
    Comments: Comments,
  };

  return (
    <img
      src={icons[category]}
      alt={`A ${category} icon.`}
      id={category.toLowerCase()}
      className='icon'
    />
  );
};

export default Icon;
