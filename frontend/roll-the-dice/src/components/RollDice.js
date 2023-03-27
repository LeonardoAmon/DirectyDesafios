import { useState } from "react";
import Dice from "react-dice-complete";
import { Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import "./RollDice.css";

function RollDice() {
    const [rollResult, setRollResult] = useState(null);
    const [selectedDice, setSelectedDice] = useState(6);
    const [results, setResults] = useState([]);

    const handleRollClick = async () => {
        try {
            const response = await axios.post("http://localhost:3001/roll-dice", {
                sides: selectedDice,
            });
            const { result } = response.data;
            setRollResult(result);
            setResults([...results, { dice: `D${selectedDice}`, result }]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearResults = () => {
        setResults([]);
    };

    return (
        <div className="container">
          <div className="content-container">
            <div className="main-content">
              <div className="dice-container">
                <Dice
                  numDice={1}
                  outline={false}
                  faceColor={"#B0C4DE"}
                  dotColor={"#000000"}
                  dieSize={100}
                  rollTime={1}
                  rollDone={setRollResult}
                />
              </div>
              <div className="form-group col-12 mt-3">
                <label htmlFor="dice-selector">Selecione o dado:</label>
                <select
                  id="dice-selector"
                  className="form-control mt-3 mb-3"
                  value={selectedDice}
                  onChange={(e) => setSelectedDice(Number(e.target.value))}
                >
                  <option value={4}>D4</option>
                  <option value={6}>D6</option>
                  <option value={8}>D8</option>
                  <option value={10}>D10</option>
                  <option value={12}>D12</option>
                  <option value={20}>D20</option>
                  <option value={100}>D100</option>
                </select>
              </div>
              <Button className="buttonRoll mb-3 col-12" variant="primary" onClick={handleRollClick}>
                Rolar
              </Button>
              {rollResult && (
                <p className="result">
                  Resultado: <span className="result-value">{rollResult}</span>
                </p>
              )}
            </div>
            <div className="roll-history-container">
              {results.length > 0 && (
                <div className="mt-5">
                  <h4>Histórico de Rolagens:</h4>
                  <ListGroup>
                    {results.map((result, index) => (
                      <ListGroup.Item key={index}>
                        {result.dice} Resultado: {result.result}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button variant="danger" onClick={handleClearResults} className="mt-3 col-12">
                    Limpar Histórico
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }    

export default RollDice;
