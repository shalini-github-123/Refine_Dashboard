import React from "react";
import { Form, Input, Select, Modal, Drawer, Button } from "antd";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_USERS_MUTATION } from "@/graphql/mutations";

const { Option } = Select;

const CreateUser: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const go = useGo();

  const { formProps, modalProps } = useModalForm({
    action: "create",
    resource: "users",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: () => {
      onSuccess();
      onClose();
    },
    meta: {
      gqlMutation: CREATE_USERS_MUTATION,
    },
  });

  // Define your default timezone here
  const defaultTimezone = "UTC";

  return (
    <Drawer title="Create User" width={512} onClose={onClose} visible={true}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="User name"
          name="name"
          rules={[{ required: true, message: "Please enter a user name" }]}
        >
          <Input placeholder="Please enter a user name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter an email" }]}
        >
          <Input placeholder="Please enter an email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter a phone number" }]}
        >
          <Input placeholder="Please enter a phone number" />
        </Form.Item>
        <Form.Item
          label="Job Title"
          name="jobTitle"
          rules={[{ required: true, message: "Please enter a job title" }]}
        >
          <Input placeholder="Please enter a job title" />
        </Form.Item>
        <Form.Item
          label="Timezone"
          name="timezone"
          initialValue={defaultTimezone}
          hidden
        >
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Please select a role">
            <Option value="SALES_INTERN">Sales Intern</Option>
            <Option value="SALES_MANAGER">Sales Manager</Option>
            <Option value="SALES_PERSON">Sales Person</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateUser;
