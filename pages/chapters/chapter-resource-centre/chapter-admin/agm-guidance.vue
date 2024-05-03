<script setup lang="ts">

const option_1_table = ref([
    {
        Advantages: 'Candidates are asked questions which the audience feel are important\n' +
            'Candidates are given the opportunity to inform the audience of their vision\n' +
            'Quick and easy way to elect a committee\n' +
            'The audience are in control', Disadvantages: 'Can be unfair due to popularity\n' +
            'Views and perspectives may be different from each individual\n' +
            'Lack of attention to recruitment processes'
    }
]);

const option_2_table = ref([
    {
        Advantages: 'You can speak to each person applying separately and understand their vision\n' +
            'Gives each candidate to express their passion regarding their role\n' +
            'Good recruitment process followed', Disadvantages: 'Long process/time consuming\n' +
            'Lack of audience choice\n' +
            'New committee could be elected based on favouritism'
    }
]);

const option_3_table = ref([
    {
        Advantages: 'Allows candidates to ask questions to the relevant role member\n' +
            'Allow the audience to have a choice\n' +
            'Gives each candidate to express their passion regarding their role\n' +
            'Both the current committee and audience have the opportunity to have a say in who is elected',
        Disadvantages: 'It is a long process\n' +
            'Can be stressful\n' +
            'New committee could be elected based on favouritism'
    }
]);

</script>

<template>
    <div>
        <h1>Taking your AGM to the Next Level</h1>
        <div class="grid">
            <!--LHS Column-->
            <div class="col-12 xl:col-6">
                <div class="card">
                    <h5>What is an Annual General Meeting</h5>
                    <p>
                        An Annual General Meeting gives your committee an opportunity to showcase all the great things
                        taken place over the year. This can be from weekly aarti sessions to flagship events. This gives
                        the opportunity for many to
                        discuss and evaluate what went well, and what improvements can be made for next year.
                    </p>
                </div>
                <div class="card">
                    <h5>Why do we have an Annual General Meeting</h5>
                    <p>
                        The main purpose of an Annual General Meeting is:
                        <ul>
                            <li>To allow your members to hear reports from the committee on the achievements and work of
                                your group over the year
                            </li>
                            <li>To discuss points of improvement</li>
                            <li>To elect a new committee for the next year</li>
                            <li>To make any changes to the committee</li>
                        </ul>
                    </p>
                </div>
                <div class="card">
                    <h5>When should an Annual General Meeting be held?</h5>
                    <p>
                        An Annual General Meeting should be held at the end of the academic year. This is usually
                        between March and May. This is to ensure that all members are present and can discuss the
                        achievements and improvements that can be made for the following year.
                    </p>
                </div>

            </div>
            <!--RHS Column-->
            <div class="col-12 xl:col-6">
                <div class="card">
                    <h5>How to organise an effective annual general meeting</h5>
                    <h6>7 Key Steps to Organising an Effective AGM</h6>
                    <p>
                        <ol>
                            <li>Pick a date</li>
                            <li>Book a venue which is appropriate for all (2/3 months in advance)</li>
                            <li>Think about the health and safety of your members. For example, are there any hazards
                                that need to be taken care of? Are there fire exists?
                            </li>
                            <li>Decide on what content is to be discussed at the AGM event</li>
                            <li>Start planning and designing posters for the AGM (2/3 months in advance)</li>
                            <li>Decide on what refreshments you want to provide</li>
                            <li>Invite all members and friends through either:
                                <ol>
                                    <li>Creating a Facebook event page/other social media networks</li>
                                    <li>Sending personal invitations</li>
                                </ol>
                            </li>
                        </ol>
                    </p>
                </div>
                <div class="card">
                    <h5>What Really Happens at an AGM?</h5>
                    <p>
                        An Annual General Meeting is designed to overlook all the accounts and events that have taken
                        place in the year. This is an opportunity for everyone to discuss what went well, what funds
                        were raised, and what should be done next year for growth.
                        <ul>
                            <li>The outgoing President will give a speech</li>
                            <li>A video or presentation will be delivered - images and videos taken throughout the
                                year
                            </li>
                            <li>A brief overview of how the committee can be improved for the next following year</li>
                            <li>A new committee is elected</li>
                            <li>The new President may give a speech</li>
                        </ul>
                    </p>
                </div>
            </div>
            <div class="col-12">
                <div class="card">
                    <h5>How to Organise an Effective Annual General Meeting</h5>
                    <p>There a 3 ways a new committee can be elected:</p>
                    <TabView>
                        <TabPanel header="Option I">
                            <ol>
                                <li>All candidates deliver a speech</li>
                                <li>Members are open to ask a series of questions</li>
                                <li>Vote on who is appropriate for the role</li>
                                <li>Votes are collected</li>
                                <li>New committee is announced</li>
                            </ol>
                            <pre>
                                <DataTable :value="option_1_table">
                                    <Column field="Advantages" header="Advantages"></Column>
                                    <Column field="Disadvantages" header="Disadvantages"></Column>
                                </DataTable>
                                </pre>
                        </TabPanel>
                        <TabPanel header="Option II">
                            <ol>
                                <li>An online application is made</li>
                                <li>Successful candidates are invited to an interview with the President and the
                                    current committee member in that position e.g. someone applying for Events
                                    Coordinator; the President and current Events Coordinator will conduct the
                                    interview
                                </li>
                                <li>New committee is elected</li>
                            </ol>
                            <pre>
                                <DataTable :value="option_2_table">
                                    <Column field="Advantages" header="Advantages"></Column>
                                    <Column field="Disadvantages" header="Disadvantages"></Column>
                                </DataTable>
                                </pre>
                        </TabPanel>
                        <TabPanel header="Option III">
                            Combine Option I and Option II together
                            <ol>
                                <li>An online application</li>
                                <li>Successful candidates are invited to an interview with the President or
                                    Vice-President
                                </li>
                                <li>Shortlisted candidates are offered a telephone interview with the relevant role
                                    committee member
                                </li>
                                <li>Successful candidates are told to present a speech at the AGM where the audience
                                    will ask a series of questions
                                </li>
                                <li>Audience will vote on new committee</li>
                                <li>Votes are collected</li>
                                <li>New committee is announced</li>
                            </ol>
                            <pre>
                                <DataTable :value="option_3_table">
                                    <Column field="Advantages" header="Advantages"></Column>
                                    <Column field="Disadvantages" header="Disadvantages"></Column>
                                </DataTable>
                            </pre>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    </div>
</template>
