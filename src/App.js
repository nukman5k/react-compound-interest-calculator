import React, { useState } from "react";
import "./App.css";

function App() {

	const [ data, setData ] = useState([]);
  	const [ initialAmountInput, setInitialAmountInput ] = useState();
  	const [ interestRateInput, setInterestRateInput ] = useState();
  	const [ termLengthInput, setTermLengthInput ] = useState();
  	const [ reinvestAmountInput, setReinvestAmountInput ] = useState( '100' );
  	const [ includeWeekendsInput, setIncludeWeekendsInput ] = useState( 'true' );
	const [ isLoading, setIsLoading ] = useState( false );

  	const calculationHandler = () => {

		setIsLoading( true );  

		let interestRate   = ( interestRateInput / 100 ) + 1;
		let reinvestAmount = parseInt(reinvestAmountInput) / 100;
		let initialAmount  = Number(initialAmountInput);
		let date = new Date();
		let totalCashout = 0;
		let stagingData = [];

		for (let i = 1; i <= termLengthInput; i++) {

			let earnings = ( initialAmount * interestRate ) - initialAmount;
			let reinvest = earnings * reinvestAmount;
			let cashout  = earnings - reinvest;

			initialAmount += reinvest;
			totalCashout += cashout;

			date.setDate( date.getDate() + 1 );

			if ( includeWeekendsInput !== 'true' ) {

				if ( date.toDateString().includes( 'Sat' ) ) {

					stagingData.push({
						date: null,
						day: null,
						earnings: null,
						reinvestAmount: null,
						initialAmount: null,
						totalCashout: null
					});

					date.setDate( date.getDate() + 2 );

				}

			} 

			stagingData.push({
				date: date.toDateString(),
				day: i,
				earnings: earnings.toFixed( 2 ),
				reinvestAmount: reinvestAmountInput,
				initialAmount: initialAmount.toFixed( 2 ),
				totalCashout: totalCashout.toFixed( 2 )
			});

		}

		setData( [ ...stagingData ] );

		setTimeout(() => {
			setIsLoading( false );  
		}, 2000);

  	};

	const resetHandler = () => {
		setData([]);
		setInitialAmountInput('');
		setInterestRateInput('');
		setTermLengthInput('');
		setIncludeWeekendsInput( 'true' );
		setReinvestAmountInput( '100' );
	};

	return (
		<div className="appContainer">
			<h1>Compound Interest Calculator</h1>

				<table className="inputTable">
					<tbody>
						<tr>
							<td>Initial Amount</td>
							<td>:</td>
							<td>
							<input
								type="number"
								value={initialAmountInput}
								onChange={( e ) => setInitialAmountInput( e.target.value )}
							/>
							</td>
						</tr>

						<tr>
							<td>Daily Interest Rate(%)</td>
							<td>:</td>
							<td>
							<input
								type="number"
								value={interestRateInput}
								onChange={( e ) => setInterestRateInput( e.target.value )}
							/>
							</td>
						</tr>

						<tr>
							<td>Length of Term (in days)</td>
							<td>:</td>
							<td>
							<input
								type="number"
								value={termLengthInput}
								onChange={( e ) => setTermLengthInput( e.target.value )}
							/>
							</td>
						</tr>

						<tr>
							<td>Reinvest Amount</td>
							<td>:</td>
							<td>
							<select
								value={reinvestAmountInput}
								onChange={( e ) => setReinvestAmountInput( e.target.value )}
							>
								<option value="5">5%</option>
								<option value="10">10%</option>
								<option value="20">20%</option>
								<option value="25">25%</option>
								<option value="30">30%</option>
								<option value="35">35%</option>
								<option value="40">40%</option>
								<option value="45">45%</option>
								<option value="50">50%</option>
								<option value="55">55%</option>
								<option value="60">60%</option>
								<option value="65">65%</option>
								<option value="70">70%</option>
								<option value="75">75%</option>
								<option value="80">80%</option>
								<option value="85">85%</option>
								<option value="90">90%</option>
								<option value="95">95%</option>
								<option value="100">100%</option>
							</select>
							</td>
						</tr>

						<tr>
							<td>Include Weekends</td>
							<td>:</td>
							<td>
							<select
								value={includeWeekendsInput}
								onChange={( e ) => setIncludeWeekendsInput( e.target.value )}
							>
								<option value="true">Yes</option>
								<option value="false">No</option>
							</select>
							</td>
						</tr>
					</tbody>
				</table>

				<div className="actionContainer">
					<button type="button" onClick={calculationHandler}>
						Calculate
					</button>
					<button type="button" className="resetBtn" onClick={resetHandler}>
						Reset
					</button>
				</div>

				{
					isLoading ? (
						<div className='loaderContainer'>
							<div class="loader">Loading...</div>
						</div>
					) : data.length !== 0 ? (
						
						<table className="output">
							<thead>
								<tr>
									<th>Date</th>
									<th>Earnings</th>
									<th>Reinvest</th>
									<th>Total Principal</th>
									<th>Total Cashout</th>
								</tr>
							</thead>

							<tbody>

								{data.map(( item, i ) => {

									return item.day ? (

										<tr key={i}>
											<td>
												{item.date} - Day {item.day}
											</td>
											<td>{item.earnings}</td>
											<td>{item.reinvestAmount}%</td>
											<td>{item.initialAmount}</td>
											<td>{item.totalCashout}</td>
										</tr>
			
									) : (
										<tr key={i}>
											<td colSpan="5">WEEKEND</td>
										</tr>
									)
								})}

							</tbody>

						</table>

					) : ''
				}

				
		</div>
  	);
}

export default App;
