/**
*
* User component
*
*/

// Packages
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withApollo } from "react-apollo";
import { Layout } from "antd";

// components
import UserSidebar from '../components/UserSidebar';
import Header from '../components/MyHeader';

// Redux actions

// For Workspace
import {
  findBufferById,
  findModuleById,
  showListOfObjects,
  selectModule,
  createModule,
  updateModule,
  removeModule,
  showModuleSetting,
  createBuffer,
  updateBuffer,
  removeBuffer,
  createMachine,
  updateMachine,
  createLine,
  getLinesByUser,
  getModulesByLineId,
  getBuffersByLineId,
  getLineById,
  updateLine,
  setElementData,
  updateDataState,
  setSelectedElements,
  setFoldedElements,
  removeMachine,
  resetMethodData,
  getLinesByOrganization,
  removeLine,
  getMachinesByModule,
  getMachinesByBuffer,
  findMachineById,
  showModuleMachines,
  createProduct,
  updateProduct,
  removeProduct,
  getProductsByOrganization,
  getFactoriesByOrganization,
  searchLines,
  searchMachines,
  addMachineInModule,
  removeMachineInModule,
  getLineFactory,
  updateModuleMachines,
  getLinesByFactory,
  updateBuffersRate,
  toggleMachineLearningConsole, createLineModel, getSimulationsByLineModelId
} from "../ducks/workspace/actions";

// For Dashboard
import {
  countLocations,
  countLines,
  countFactories,
  countMachines, updateCountData
} from "../ducks/dashboard/actions";

// For user
import { resetPassword, updateUser } from "../ducks/user/action";

// For Socket
import {
  continuousAnalyticMethodRequest, extractMachineLearningDataRequest, machineLearningMethodRequest,
  stopMachineLearningTrainingRequest, updateLineWhereMLRunning
} from "../ducks/socket/actions";

// Import Chat widjet
import ChatWidjet from '../components/ChatWidjet';

// styles
import "./hoc.css";

const { Content } = Layout;

export default (WrappedComponent, props = {}) => {
  class WithUserHOC extends PureComponent {
    render() {
      const { history } = this.props;
      
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  
  const mapStateToProps = ({ user, workspace, dashboard }) => ({
    user: user.currentUser,
    products: workspace.products,
    factories: workspace.factories,
    lines: workspace.lines,
    line: workspace.line,
    module: workspace.module,
    buffer: workspace.buffer,
    machines: workspace.machines,
    modules: workspace.modules,
    buffers: workspace.buffers,
    elementData: workspace.elementData,
    dataChanged: workspace.dataChanged,
    selectedElements: workspace.selectedElements,
    foldedElements: workspace.foldedElements,
    methodData: workspace.methodData,
    count_locations: dashboard.count_locations,
    count_factories: dashboard.count_factories,
    count_lines: dashboard.count_lines,
    count_machines: dashboard.count_machines,
    count_users: dashboard.count_users,
    viewModuleMachines: workspace.showModuleMachines,
    linesFound: workspace.linesFound,
    machinesFound: workspace.machinesFound,
    lineFactory: workspace.lineFactory,
    machine: workspace.machine,
    moduleMachines: workspace.moduleMachines,
    factoryLines: workspace.factoryLines,
    mlLoading: workspace.machineLearning.loading,
    consoleConnected: workspace.machineLearning.consoleConnected,
    consoleOpened: workspace.machineLearning.consoleOpen,
    mlLogs: workspace.machineLearning.logs,
    mlStep: workspace.machineLearning.step,
    mlStop: workspace.machineLearning.stop,
    estimateTime: workspace.machineLearning.estimatetime,
    mlPid: workspace.machineLearning.pid,
    mlError: workspace.machineLearning.error,
    mlLineModelId: workspace.machineLearning.linemodel_id,
    simulations: workspace.simulations,
  });
  
  const mapDispatchToProps = dispatch => ({
    countLocations: (client, data) => dispatch(countLocations(client, data)),
    countLines: (client, data) => dispatch(countLines(client, data)),
    countFactories: (client, data) => dispatch(countFactories(client, data)),
    countMachines: (client, data) => dispatch(countMachines(client, data)),
    updateCountData: (data) => dispatch(updateCountData(data)),
    
    createProduct: (client, data) => dispatch(createProduct(client, data)),
    updateProduct: (client, data) => dispatch(updateProduct(client, data)),
    removeProduct: (client, data) => dispatch(removeProduct(client, data)),
    getProductsByOrganization: (client, data) => dispatch(getProductsByOrganization(client, data)),
  
    getFactoriesByOrganization: (client, data) => dispatch(getFactoriesByOrganization(client, data)),
    getLineFactory: (client, data) => dispatch(getLineFactory(client, data)),
  
    createLine: (client, data) => dispatch(createLine(client, data)),
    updateLine: (client, data) => dispatch(updateLine(client, data)),
    removeLine: (client, data) => dispatch(removeLine(client, data)),
    getLineById: (client, data) => dispatch(getLineById(client, data)),
    getLinesByUser: (client, data) => dispatch(getLinesByUser(client, data)),
    getLinesByOrganization: (client, data) => dispatch(getLinesByOrganization(client, data)),
    getLinesByFactory: (client, data) => dispatch(getLinesByFactory(client, data)),
    searchLines: (client, data) => dispatch(searchLines(client, data)),
    
    createModule: (client, data) => dispatch(createModule(client, data)),
    updateModule: (client, data) => dispatch(updateModule(client, data)),
    removeModule: (client, data) => dispatch(removeModule(client, data)),
    findModuleById: (client, data) => dispatch(findModuleById(client, data)),
    getModulesByLineId: (client, data) => dispatch(getModulesByLineId(client, data)),
    addMachineInModule: (client, data) => dispatch(addMachineInModule(client, data)),
    removeMachineInModule: (client, data) => dispatch(removeMachineInModule(client, data)),
    updateModuleMachines: (data) => dispatch(updateModuleMachines(data)),
  
    createBuffer: (client, data) => dispatch(createBuffer(client, data)),
    updateBuffer: (client, data) => dispatch(updateBuffer(client, data)),
    removeBuffer: (client, data) => dispatch(removeBuffer(client, data)),
    updateBuffersRate: (client, data) => dispatch(updateBuffersRate(client, data)),
    findBufferById: (client, data) => dispatch(findBufferById(client, data)),
    getBuffersByLineId: (client, data) => dispatch(getBuffersByLineId(client, data)),
    
    createMachine: (client, data) => dispatch(createMachine(client, data)),
    updateMachine: (client, data) => dispatch(updateMachine(client, data)),
    removeMachine: (client, data) => dispatch(removeMachine(client, data)),
    findMachineById: (client, data) => dispatch(findMachineById(client, data)),
    
    getMachinesByModule: (client, data) => dispatch(getMachinesByModule(client, data)),
    getMachinesByBuffer: (client, data) => dispatch(getMachinesByBuffer(client, data)),
    searchMachines: (client, data) => dispatch(searchMachines(client, data)),
  
    setElementData: (data) => dispatch(setElementData(data)),
    updateDataState: (data) => dispatch(updateDataState(data)),
    setSelectedElements: (data) => dispatch(setSelectedElements(data)),
    setFoldedElements: (data) => dispatch(setFoldedElements(data)),
    changePassword: (client, data) => dispatch(resetPassword(client, data)),
    showModuleSetting: (data) => dispatch(showModuleSetting(data)),
    selectModule: (data) => dispatch(selectModule(data)),
    showListOfObjects: (data) => dispatch(showListOfObjects(data)),
    updateUser: (client, data) => dispatch(updateUser(client, data)),
    sendContinuousAnalyticMethodRequest: (data) => dispatch(continuousAnalyticMethodRequest(data)),
    resetMethodData: (data) => dispatch(resetMethodData(data)),
    showModuleMachines: (data) => dispatch(showModuleMachines(data)),
    sendMachineLearningMethodRequest: (data) => dispatch(machineLearningMethodRequest(data)),
    toggleConsole: (data) => dispatch(toggleMachineLearningConsole(data)),
    stopMachineLearningTrainingRequest: (data) => dispatch(stopMachineLearningTrainingRequest(data)),
    updateLineWhereMLRunning: (data) => dispatch(updateLineWhereMLRunning(data)),
    createLineModel: (data) => dispatch(createLineModel(data)),
    getSimulationsByLineModelId: (client, data) => dispatch(getSimulationsByLineModelId(client, data)),
    extractMachineLearningDataRequest: (data) => dispatch(extractMachineLearningDataRequest(data)),
  });
  
  return connect(mapStateToProps, mapDispatchToProps)(withRouter(withApollo(WithUserHOC)));
};
