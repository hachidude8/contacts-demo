package xyz.hachidev.demoapi.contact.db.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import xyz.hachidev.demoapi.contact.db.entity.Contact;

@RepositoryRestResource(
        exported = true,
        collectionResourceRel = "contacts",
        path = "contacts"
)
public interface ContactRepository extends MongoRepository<Contact, String> {
//public interface ContactRepository extends PagingAndSortingRepository<Contact, Long> {
}
