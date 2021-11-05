// import React from 'react'
// import { oneOf } from 'prop-types'
// import InfoIcon from '@material-ui/icons/Info';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';

// function Alert({ kind, msg='' }) {
//   return (
//     <div
//       style={{
//         margin: '12px 0',
//         padding: '12px 30px',
//         display: 'flex',
//         alignItems: 'center',
//         backgroundColor: 'grey',
//         color: 'white',
//         borderRadius: 2,
//         '@media (max-width: 600px)': {
//           padding: '6px 15px'
//         }
//       }}
//     >
//       {kind ? (
//         <div
//           style={{
//             flexShrink: 0,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 50,
//             height: 50,
//             marginRight: 20,
//             borderRadius: 25,
//             background: 'white',
//             color: 'grey',
//             svg: { height: 24, width: 'auto' }
//           }}>
//           { kind === 'info' ? (<InfoIcon />) : 
//             kind === 'pass' ? (<CheckCircleIcon />) : 
//             kind === 'error' ? (<ErrorIcon />) : 
//             null
//           }
//         </div>
//       ) : null}
//       <div
//         style={{
//           width: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           textAlign: 'left'
//         }}>
//         <p
//           style={{
//             marginRight: 20,
//             '@media (max-width: 600px)': {
//               fontSize: 13,
//               lineHeight: '21px'
//             }
//           }}>
//           { msg }
//         </p>
//       </div>
//     </div>
//   )
// }

// Alert.propTypes = {
//   kind: oneOf(['info', 'pass', 'error'])
// }

// export default Alert
