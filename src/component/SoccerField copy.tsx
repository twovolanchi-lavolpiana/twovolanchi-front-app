import '../css/SoccerField.css';

const SoccerField: React.FC = () => {
    return (
        <div className="soccer-field">
            <div className="field-line horizontal top"></div>
            <div className="field-line horizontal middle"></div>
            <div className="field-line horizontal bottom"></div>
            <div className="field-line vertical left"></div>
            <div className="field-line vertical right"></div>
            <div className="center-circle"></div>
            <div className="penalty-box-top"></div>
            <div className="penalty-box-bottom"></div>
            <div className="goal-box-top"></div>
            <div className="goal-box-bottom"></div>
            <div className="corner corner-top-left"></div>
            <div className="corner corner-top-right"></div>
            <div className="corner corner-bottom-left"></div>
            <div className="corner corner-bottom-right"></div>
        </div>
    );
};

export default SoccerField;
