import React from 'react';
import { View, ScrollView } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function TermsOfUse({ closeModal }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.parentContainer}>
            <ScrollView
                style={classes.scrollViewParentContainer}
                contentContainerStyle={
                    classes.scrollViewParentContentContainerStyle
                }
            >
                <TextRegular style={classes.documentText}>
                    <TextRegular weight="bold">
                        Lorem ipsum dolor sit amet
                    </TextRegular>{' '}
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </TextRegular>
                <TextRegular style={classes.documentText}>
                    <TextRegular weight="bold">
                        Sed ut perspiciatis unde omnis
                    </TextRegular>{' '}
                    iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Neque
                    porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                    consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut
                </TextRegular>
                <TextRegular style={classes.documentText}>
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur?
                </TextRegular>
                <TextRegular style={classes.documentText}>
                    <TextRegular weight="bold">Quis autem</TextRegular> vel eum
                    iure reprehenderit qui in ea voluptate velit esse quam nihil
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo
                    voluptas nulla pariatur?
                </TextRegular>
                <TextRegular style={classes.documentText}>
                    <TextRegular weight="bold">At vero eos et </TextRegular>{' '}
                    accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores
                    et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt
                    mollitia animi, id est laborum et dolorum fuga. Et harum
                    quidem rerum facilis est et expedita distinctio. Nam libero
                    tempore, cum soluta nobis est eligendi optio cumque nihil
                    impedit quo minus id quod maxime placeat facere possimus,
                    omnis voluptas assumenda est, omnis dolor repellendus.
                </TextRegular>
                <TextRegular
                    onPress={closeModal}
                    style={[classes.documentText, { textAlign: 'center' }]}
                    color="rgba(0, 0, 0, 0.35)"
                >
                    Close
                </TextRegular>
            </ScrollView>
        </View>
    );
}

export default TermsOfUse;
