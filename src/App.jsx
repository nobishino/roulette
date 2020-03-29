import React from 'react';

const InputBox = props => {
    const parseInput = text => {
        return text
            .replace(/\n(\s)+\n/, "\n", 'g', 'm') //0個以上のスペースのみからなる行を削除
            .replace(/\n(\s)+$/, "", 'g', 'm')
            .split(/\r\n|\r|\n/) //改行コードで分割
            .filter(item => item !== ""); //空行削除
    }
    const onChange = event => {
        const text = event.target.value;
        const items = parseInput(text)
        props.onChange(items);
    }
    return (
        <div id="inputbox" className="component">
            <h2>List of candidate items:</h2>
            <textarea id="inputarea" onChange={onChange}></textarea>
        </div>
    )
}
const Control = props => {
    return (
        <div id="control" className="component">
            <button onClick={props.onStart}>Start</button>
            <button onClick={props.onStop}>Stop</button>
        </div>
    )
}

const RouletteItems = props => {
    const selectClass = index => {
        if (index !== props.selected) {
            return "item-default";
        } else if (props.finished) {
            return "item-winner";
        } else {
            return "item-selected";
        }
    }
    const items = props.itemList.map((itemLabel, index) => {
        return <Item key={index + "-" + itemLabel} itemLabel={itemLabel} select={selectClass(index)} />
    });
    return items;
}

const Item = props => {
    return <div className={`item ${props.select}`}>{props.itemLabel}</div>
}

const Display = props => {
    const itemList = props.itemList || [];
    return (
        <div className="container component">
            <RouletteItems itemList={itemList} selected={props.selected} finished={props.finished} />
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            items: [],
            finished: false,
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
    }
    handleTextareaChange(items) {
        this.setState({
            selected: -1,
            items: items,
            finished: false,
        });
    }
    onStart() {
        // intervalMillsec = intervalMillsec || 1000;
        const interval = setInterval(() => {
            this.setState(state => {
                return {
                    selected: (state.selected + 1) % state.items.length,
                }
            });
        }, 200);
        this.setState({
            finished: false,
            interval: interval,
        });
    }
    onStop() {
        const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
        const itemNum = this.state.items.length
        const randCnt = itemNum + getRandomInt(2*itemNum);
        this.setState(state => {
            if (this.state.finished) return;
            clearInterval(state.interval);
            const interval = setInterval(() => {
                this.setState(state => {
                    console.log(`Remaining: ${state.countdown}`)
                    if (state.countdown > 0) {
                        return{
                            countdown: state.countdown - 1,
                            selected: (state.selected + 1) % state.items.length,
                        };
                    } else {
                        clearInterval(state.interval)
                        return {
                            interval: null,
                            finished: true,
                        };
                    }
                });

            }, 500);
            return {
                countdown: randCnt,
                interval: interval,
            }
        });
    }
    render() {
        return (
            <div>
                <InputBox onChange={this.handleTextareaChange} />
                <Control onStart={this.onStart} onStop={this.onStop} intervalMillsec={1000} />
                <Display itemList={this.state.items} selected={this.state.selected} finished={this.state.finished} />
            </div>
        )
    }
}
export default App;