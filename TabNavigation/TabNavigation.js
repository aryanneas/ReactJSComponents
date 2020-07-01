import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes, { object } from 'prop-types'

const TabsWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
`

const TabsHeader = styled.div`
  width: inherit;
  height: 60px;
  display: flex;
  border-bottom: 2px solid #2575fc;
`

const Tab = styled.div`
  height: inherit;
  padding: 0 24px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  position: relative;
  &.active {
    color: #fff;
    font-weight: 300;
    background: #2575fc;
  }
`
const TabContent = styled.div`
  padding: 24px;
  font-size: 16px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.54);
`

const TabNavigation = ({ tabsData }) => {
  const [selectedTab, setSelectedTab] = useState('tab1')

  return (
    <TabsWrapper id="tabs-wrapper">
      <TabsHeader>
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            data-tab={`tab${tab.id}`}
            className={`tabs ${selectedTab === `tab${tab.id}` ? 'active' : ''}`}
            onClick={e => setSelectedTab(e.currentTarget.getAttribute('data-tab'))}
          >
            {tab.tabName}
          </Tab>
        ))}
      </TabsHeader>
      <TabContent>{tabsData[selectedTab.slice(3) - 1].tabContent}</TabContent>
    </TabsWrapper>
  )
}

TabNavigation.propTypes = {
  tabsData: PropTypes.arrayOf(object).isRequired
}

export default TabNavigation
