import React, { Component } from 'react'

import './Calculator.css'

import Button from '../components/Button/Button'
import Display from '../components/display/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props) {
        super(props)

        // correcao do this
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        console.log(operation)
    }

    addDigit(digit) {

        // regra para evitar ter 2 pontos na calculadora
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        // regra para trocar limpar o display se só tiver o digito zero
        // ou se clearDisplay do estado for true
        const clearDisplay = this.state.displayValue === "0"
                            || this.state.clearDisplay

        // valor atual sera vazio se o display tiver de ser limpo
        // ou pega o valor do state
        const currentValue = clearDisplay ? '' : this.state.displayValue

        // o novo valor sera o valor atual concatenado com o novo digito
        const displayValue = currentValue + digit

        // atualiza o estado do componente com os novos parametros
        // caso for adicionado um novo digito, nao deve resetar o display
        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            // pega o indice atual do array de valores
            const i = this.state.current
            // pega e converte o novo valor atual
            const newValue = parseFloat(displayValue)
            // pega o array de valores do state.values
            const values = [...this.state.values]
            // atribui o novo valor convertido para a posicao i
            values[i] = newValue
            // atualiza o estado
            this.setState({values})
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}