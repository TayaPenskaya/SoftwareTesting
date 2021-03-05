import { render } from '@testing-library/react';
import './matchMedia.mock';
import Tables from "../components/Tables";

describe('Component tests for Tables', () => {

    it ('empty component test', () => {
        const {container} = render(<Tables />);
        expect(container.children.length).toBe(1);
        expect(container.getElementsByClassName('ant-empty-description')[0].firstChild.textContent).toBe('No Data');
    });


    it('component with 3 tables', () => {
        const spy = jest.fn();
        Tables.prototype.componentDidMount = function(){
            spy();
            const tables = [
                {
                    "id": "603a27b537ccb2f60d4eaca1",
                    "seats": 10,
                    "free": 9,
                    "rake": 5,
                    "isPlaying": {
                        "flag": true,
                        "idx": 0
                    }
                },
                {
                    "id": "603a28f337ccb2f60d4eaca2",
                    "seats": 10,
                    "free": 10,
                    "rake": 5,
                    "isPlaying": {
                        "flag": false,
                        "idx": 1
                    }
                },
                {
                    "id": "603a30ad37ccb2f60d4eaca5",
                    "seats": 10,
                    "free": 10,
                    "rake": 5,
                    "isPlaying": {
                        "flag": false,
                        "idx": 2
                    }
                }
            ];
            this.setState({tables: tables});
        };
        const {container} = render(<Tables />);
        expect(container.getElementsByClassName('ant-table-tbody')[0].children.length).toBe(3);
    });
});