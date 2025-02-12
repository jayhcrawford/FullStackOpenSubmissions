import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { HealthCheckRating } from '../types';

type BarProps = {
  rating: HealthCheckRating;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  }
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      <StyledRating
        readOnly
        value={4 - parseInt(rating)}
        max={4}
        icon={<Favorite fontSize="inherit" />}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[parseInt(rating)]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
