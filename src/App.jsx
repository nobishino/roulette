import React, { useState } from 'react';

const InputBox = props => {
    const parseInput = text => {
        return text
            .split(/\r\n|\r|\n/) //改行コードで分割
            .filter(item => !item.match(/^\s*$/)); //空行削除
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

//速度調整用
const beforeStopButtonMillSec = 100;
const afterStopButtonMullSec = 500;

const AppF = () => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(-1);
    const [intervalId, setIntervalId] = useState(null);
    const [countdown, setCountdown] = useState(-1);
    const [rolling, setRolling] = useState(false);
    const isFinished = () => countdown === 0 && !rolling;
    const handleTextareaChange = items => {
        setItems(items);
        setSelected(-1);
        setCountdown(-1);
    };
    const rollNext = current => {
        const diff = Math.floor(Math.random() * (items.length - 1)) + 1; // diff <- [1, size - 1] 
        const next = (current + diff) % items.length
        console.log(`Selected item: (${next}, ${items[next]})`);
        return next
    };
    const clearIntervalId = id => {
        clearInterval(id);
        return null;
    };
    const onStart = () => {
        if (intervalId !== null) {
            console.log(`intervalId is not null: ${intervalId}`);
            return;
        }
        if (items.length === 0) {
            console.log(`items are empty`);
            return;
        }
        setRolling(true);
        setIntervalId(setInterval(() => {
            setSelected(rollNext);
        }, beforeStopButtonMillSec));
    };
    const onStop = () => {
        console.log("onStop() called");
        if (!rolling) {
            console.log(`Roulette is not rolling.`);
            return;
        }
        const startCount = Math.floor(Math.random() * items.length) + items.length;
        setCountdown(startCount > 0 ? startCount : 1);
        setIntervalId(intervalId => {
            clearInterval(intervalId);
            return setInterval(() => {
                setCountdown(cnt => {
                    const nextCnt = cnt - 1;
                    console.log(`count = ${nextCnt}`);
                    setSelected(rollNext);
                    if (nextCnt === 0) {
                        setIntervalId(clearIntervalId);
                        setRolling(false);
                    }
                    return nextCnt;
                });
            }, afterStopButtonMullSec);
        });
    };
    return (
        <div>
            <InputBox onChange={handleTextareaChange} />
            <Control onStart={onStart} onStop={onStop} />
            <Display itemList={items} selected={selected} finished={isFinished()} />
        </div>
    );
}
export default AppF;