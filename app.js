
class App extends React.Component {

    constructor() {
        super();
        this.state = {
            calcul: '',
            resultat: '',
            calculs: []
        };
        this.concatenate = this.concatenate.bind(this);
        this.result = this.result.bind(this);
        this.saveResult = this.saveResult.bind(this);
    }
    concatenate(value) {
        if (value == "/" || value == "+" || value == "-" || value == "*") {
            this.setState({calcul: this.state.calcul + ' ' + value + ' '})
        } else {
            this.setState({calcul: this.state.calcul + value})
        }
    }
    result() {
        this.setResult();
        this.saveResult();
        setTimeout( () => this.setState({
            calcul: '',
            resultat: ''
        }), 50);
    }

    setResult() {
        let resultat = eval(this.state.calcul);
        this.setState({resultat: resultat});
    }
    saveResult() {

        setTimeout( () => this.setState({
            calculs: [...this.state.calculs, [this.state.calcul, this.state.resultat]]
        }, () => console.log(this.state.calculs)), 0);
      
    }
    clearAll() {
        this.setState({
            calcul: '',
            resultat: '',
            calculs: []
        })
    }
    render() {
        return (
            <div className="container">
                {
                    this.state.calculs.map(prevCalcul => (
                    <div className="ligne_calcul">
                        <span className="calcul">{prevCalcul[0]}&nbsp;</span>
                        <span className="resultat"> = {prevCalcul[1]}</span>
                    </div>
                    ))
                }
                <div className="ligne_calcul"><span className="calcul">{this.state.calcul}&nbsp;</span><span className="resultat"> = {this.state.resultat}</span></div>
                <Ligne v1="7" f1={this.concatenate} v2="8" f2={this.concatenate} v3="9" f3={this.concatenate} v4="/" f4={this.concatenate}/>
                <Ligne v1="4" f1={this.concatenate} v2="5" f2={this.concatenate} v3="6" f3={this.concatenate} v4="*" f4={this.concatenate}/>
                <Ligne v1="1" f1={this.concatenate} v2="2" f2={this.concatenate} v3="3" f3={this.concatenate} v4="-" f4={this.concatenate}/>
                <Ligne v1="0" f1={this.concatenate} v2="." f2={this.concatenate} v3="=" f3={this.result} v4="+" f4={this.concatenate}/>
                <button className="reset" onClick={ () => this.clearAll()}>Reset</button>
            </div>
        );
    }
    }

    class Ligne extends React.Component {

        render() {
            let lignes = 
            [
                {
                
                    function: this.props.f1,
                    value: this.props.v1,
                },
                {
                    function: this.props.f2,
                    value: this.props.v2,
                },
                {
                    function: this.props.f3,
                    value: this.props.v3,
                },
                {
                    function: this.props.f4,
                    value: this.props.v4,
                }
            ];
            return (
                <div className="row">
                    {
                        lignes.map(bouton => (
                            <Button concatenate={bouton.function} value={bouton.value} />
                        ))
                    }
                    
                </div>
            );
        }
        }

    class Button extends React.Component {
        render() {
            return (
                <button onClick={()=>this.props.concatenate(this.props.value)} className="button">{this.props.value}</button>
            );
        }
    }

ReactDOM.render(<App />, document.getElementById('root'));

let boutons = document.querySelectorAll('button');
boutons.forEach(bouton => {
    if (bouton.innerHTML == "=") {
        bouton.classList.add("egal");
    }
});