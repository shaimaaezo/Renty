import axios from '../../axiosConfig/axios'
import Login from '../../component/login/login'

class ApiHandel extends Component {
    state = {

        firstName: 'shaim',
        lastName: 'ez',
        email: 'ez',
        password: 'ez',
    }

    //post data in user schema 
    post = (data) => {
        axios.post('/users.json', data).then(response => {
            //console.log(response)
        })
    }

    render() {
        return (
            <Login postuser={(data)=>this.post(data)}></Login>
        );
    }
}

export default ApiHandel;

