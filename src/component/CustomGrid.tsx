import { Paper } from "@mui/material";
import { Card, CardContent } from '@mui/material';
import '../css/test.css'

const CustomGrid = () => {
  return (
    <div className="container">
      <Card className="card card-grid1">
        <CardContent>1</CardContent>
      </Card>
      <Card className="card card-grid6">
        <CardContent>6</CardContent>
      </Card>
      <Card className="card card-grid2">
        <CardContent>2</CardContent>
      </Card>
      <Card className="card card-grid3">
        <CardContent>3</CardContent>
      </Card>
      <Card className="card card-grid4">
        <CardContent>4</CardContent>
      </Card>
      <Card className="card card-grid5">
        <CardContent>5</CardContent>
      </Card>
    </div>
  );
};

export default CustomGrid;