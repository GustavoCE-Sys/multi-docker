import React, { Component } from "react";
import axios from 'axios';

class Fib extends Component{
    state = {
        seenIndexs: [],
        values: {},
        index: ''
    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexs();
    }

    async fetchValues(){
        const values = await axios.get('/api/values/current');
        this.setState({
            values: values.data
        });
    }

    async fetchIndexs(){
        const seenIndexs = await axios.get('/api/values/all');
        this.setState({
            seenIndexs: seenIndexs.data
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({
            index: ''
        });
    };

    renderSeenIndexs(){
        return this.state.seenIndexs.map(({number})=>number).join(', ');
    }

    renderValues(){
        const entries = [];

        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    para o index {key} eu calculei {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>inserir index</label>
                    <input 
                        value={this.state.index}
                        onChange={event => this.setState({index: event.target.value})}
                    />
                    <button>enviar</button>
                </form>

                <h3>indexs que vi</h3>
                {this.renderSeenIndexs()}

                <h3>valores calculados</h3>
                {this.renderValues()}
            </div>
        );
    }
};

export default Fib;