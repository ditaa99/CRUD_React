

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export async function fetchStaffMembers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/staffMembers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchStaffMember(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/staffMembers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createStaffMember(newStaffMember) {
  try {
    const response = await axios.post(`${API_BASE_URL}/staffMembers`, newStaffMember);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStaffMember(updatedStaffMember) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/staffMembers/${updatedStaffMember.id}`,
      updatedStaffMember
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteStaffMember(id) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/staffMembers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
